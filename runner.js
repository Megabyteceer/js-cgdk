/**
 * Created by Megabyte on 09.11.2016.
 */

var token = process.argv[4]||"0000000000000000";

var RemoteProcessClient = require('./remote-process-client.js');

var remoteProcessClient = new RemoteProcessClient.connect(process.argv[2]||'127.0.0.1', process.argv[3]||31001, function onServerConnect() {


    if(process.env.DEBUG){
        run();
    } else {
        try {
            run();
        } catch (e) {
            console.log('INITIALIZATIN ERROR: '+e.message);
        }
    }
});

var strategies = [];
var teamSize;
var game;
var MyStrategy = require('./my-strategy.js');
var Move = require('./model/move.js');


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

            remoteProcessClient.readPlayerContextMessage(handleGameFrame);

        });
    });

}

function handleGameFrame(playerContext) {
    var stop = false;
    var playerWizards = playerContext.wizards;

    if (playerWizards == null || playerWizards.length != teamSize) {
        stop = true;
    } else {


        var moves = [];

        for (var wizardIndex = 0; wizardIndex < teamSize; ++wizardIndex) {
            var playerWizard = playerWizards[wizardIndex];

            var move = Move.getInstance();
            moves[wizardIndex] = move;
            if (process.env.DEBUG) {
                strategies[wizardIndex](playerWizard, playerContext.world, game, move);
            } else {
                try {
                    strategies[wizardIndex](playerWizard, playerContext.world, game, move);
                } catch (e) {
                    console.log('ERROR: '+e.message);
                    stop = true;
                }
            }

        }
        remoteProcessClient.writeMovesMessage(moves);
    }

    if (stop) {
        remoteProcessClient.close();
        console.log('runner stopped');
        process.exit();
    } else {
        remoteProcessClient.readPlayerContextMessage(handleGameFrame);
    }


}