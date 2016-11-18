/**
 * Created by Megabyte on 09.11.2016.
 */


function goToSafeMode() {
    if (process.argv[6] === 'disable-fs') {
        var path = require('path');

        var Module = require('module');
        var originalRequire = Module.prototype.require;
        Module.prototype.require = function (moduleName) {

            if (moduleName.indexOf(__dirname)!==0) {
                moduleName = path.resolve(__dirname, moduleName);
            } else {
                moduleName = path.resolve(moduleName);
            }

            if (moduleName.indexOf(__dirname)!==0) {
                throw moduleName+'; Modules import is restricted. Use require(__dirname+"/module.js") to import any modules. Ипорт модулей ограничен. Используйте (__dirname+"/module.js") для импорта модулей.';
            }

            return originalRequire(moduleName);

        };
        console.log('"fs" module disabled');
    }
}


var token = process.argv[4] || "0000000000000000";
var RemoteProcessClient = require(__dirname+'/remote-process-client.js');
var remoteProcessClient = new RemoteProcessClient.connect(process.argv[2] || '127.0.0.1', process.argv[3] || 31001, function onServerConnect() {
    if (MyStrategy.onLocalRunnerConnected) {
        MyStrategy.onLocalRunnerConnected();
    }
    if (process.env.DEBUG) {
        run();
    } else {
        try {
            run();
        } catch (e) {
            console.log('INITIALIZATION ERROR: ' + e.message);
            process.exit(1);
        }
    }
});
var strategies = [];
var teamSize;
var game;
var Move = require('./model/move.js');

goToSafeMode();

var MyStrategy = require(__dirname+'/'+(process.argv[5] || './my-strategy.js'));

var isCallbackedStrategy = false;
var moves;
function run() {
    remoteProcessClient.writeTokenMessage(token);
    remoteProcessClient.writeProtocolVersionMessage();
    remoteProcessClient.readTeamSizeMessage(function f1(v) {
        teamSize = v;
        remoteProcessClient.readGameContextMessage(function f2(v) {
            game = v;
            for (var strategyIndex = 0; strategyIndex < teamSize; ++strategyIndex) {
                strategies[strategyIndex] = MyStrategy.getInstance();
            }
            isCallbackedStrategy = strategies[0].length === 5; //http proxy strategy with callback
            remoteProcessClient.readPlayerContextMessage(handleGameFrame);
        });
    });
}
function handleGameFrame(playerContext) {
    if (!playerContext) {
        process.exit(1);
    }
    var playerWizards = playerContext.wizards;
    if (playerWizards == null || playerWizards.length != teamSize) {
        console.log('wrong wizards count');
        process.exit(1);
    } else {

        moves = [];
        callBackCount = 0;
        for (var wizardIndex = 0; wizardIndex < teamSize; ++wizardIndex) {
            var playerWizard = playerWizards[wizardIndex];
            var move = Move.getInstance();
            if (!isCallbackedStrategy) {
                moves[wizardIndex] = move;
            }
            if (process.env.DEBUG) {
                callStrategy(wizardIndex, playerWizard, playerContext.world, game, move);
            } else {
                try {
                    callStrategy(wizardIndex, playerWizard, playerContext.world, game, move);
                } catch (e) {
                    console.log('ERROR: ' + e.message);
                    process.exit(1);
                }
            }
        }
    }
    if (!isCallbackedStrategy) {
        afterAllStrategyProcessed();
    }
}
function afterAllStrategyProcessed() {
    remoteProcessClient.writeMovesMessage(moves);
    remoteProcessClient.readPlayerContextMessage(handleGameFrame);
}
var callBackCount;
function callStrategy(wizardIndex, playerWizard, world, game, move) {

    if (isCallbackedStrategy) {
        callBackCount++;
        strategies[wizardIndex](playerWizard, world, game, move, function (returnedMove) {
            moves[wizardIndex] = returnedMove;
            callBackCount--;
            if (callBackCount === 0) {
                afterAllStrategyProcessed();
            }
        });
    } else {
        strategies[wizardIndex](playerWizard, world, game, move);
    }
}