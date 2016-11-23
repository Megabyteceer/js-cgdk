/**
 * Created by Megabyte on 12.11.2016.
 */
var Move = require('./../model/move.js');

require('./compile.js');

var strategyProd = require('../megabyte-strategy-prod.js').getInstance();

var PORT = 25643;
try {
    var express = require('express');
    var bodyParser = require('body-parser');
    var urlOpener = require('open');
} catch (e) {
    console.log("\n\n\nError: Looks like you didn't install modules for visual debugger.");
    console.log("please try file 'install-visual-debugger.bat' to fix problem.");
    console.log("you should have 'nmp' installed first.");
    process.exit(10002);
}
var app = express();
var autoCloseToken = Math.random();
app.use(bodyParser.json());
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/js', express.static(__dirname + '/..'));
app.use('/js', express.static(__dirname + '/../node_modules/jquery/dist'));
app.get('/', function (req, res) {
    if (localRunnerConnected) {
        res.sendFile('mock.html', {root: __dirname + "/public/"});
    } else {
        res.sendFile('local-runner-not-connected.html', {root: __dirname + "/public/"});
    }
});

app.get('/snapshots.JSON', function (req, res) {
    res.sendFile('snapshots.JSON', {root: __dirname + "/public/"});
});

var responseObject;
var requestedPacket;
function answerPacket() {
    var pn = (requestedPacket >= 0) ? requestedPacket : currentPacket;
    if (jsonPpacketsToProcess[pn]) {
        responseObject.end(jsonPpacketsToProcess[pn]);
    } else {
        responseObject.end();
    }
}

var currentPacket = 0;
app.get('/packet.JSON/:packetNum', function (req, res) {
    requestedPacket = parseInt(req.params.packetNum);
    responseObject = res;
    answerPacket();
});

app.post('/move', function (req, res) {
    if (currentPacket === req.body.packetNum) {
        

        var move = Move.getInstance();
        try {
            move.setSpeed(req.body.speed);
            move.setStrafeSpeed(req.body.strafeSpeed);
            move.setTurn(req.body.turn);
            move.setAction(req.body.action);
            move.setCastAngle(req.body.castAngle);
            move.setMinCastDistance(req.body.minCastDistance);
            move.setMaxCastDistance(req.body.maxCastDistance);
            move.setStatusTargetId(req.body.statusTargetId);
            move.setSkillToLearn(req.body.skillToLearn);
            if (req.body.messages) {
                req.body.messages.some(function (m) {
                    move.addMessage(m.lane, m._skillToLearn, m.rawMessage);
                });
            }
        } catch (e) {
            res.write('Wrong move object:');
            res.write(JSON.stringify(req.body));
            console.log(e.message);
            console.log(JSON.stringify(req.body));
            var move = Move.getInstance();
        }
		
		var checkField = function(name){
			if (Math.abs(req.body[name]- prodAnswers[currentPacket][name]) < 0.00001) {
				prodAnswers[currentPacket][name] = req.body[name];
			} else {
				messageForClient += ' different value '+name+': '+req.body[name] +' / '+prodAnswers[currentPacket][name];
			}
			
		}
		checkField('speed');
		checkField('strafeSpeed');
		checkField('turn');
		checkField('minCastDistance');
		checkField('maxCastDistance');
		checkField('castAngle');
		
		
		
		
		if (JSON.stringify(req.body) !== JSON.stringify(prodAnswers[currentPacket])) {
			console.log('PROD and DEV strtaegies return differerent movements');
			messageForClient += 'PROD and DEV strtaegies return differerent movements ' + JSON.stringify(prodAnswers[currentPacket])+JSON.stringify(req.body);
		} else {
			//messageForClient += 'PROD and DEV same ' + prodAnswers[currentPacket];
		}
		
		currentPacket++;
        packetsGetterCallback(move);
		
    }
    res.end(messageForClient);
	messageForClient = undefined;
});

var fs = require('fs');

function getSnapshots() {
	
	if (fs.existsSync(__dirname+'/public/snapshots.JSON')) {
	
		var src = fs.readFileSync(__dirname+'/public/snapshots.JSON', 'utf8');
		if (!src) {
			return [];
		}
		return JSON.parse(src);
	} else {
		return [];
	}
}

function saveSnapshots(snapshots) {
	fs.writeFileSync(__dirname+'/public/snapshots.JSON', JSON.stringify(snapshots), 'utf8');
}

app.post('/snapshot', function (req, res) {
	var snapshots = getSnapshots();
	snapshots.push(req.body);
	saveSnapshots(snapshots);
    res.end();
});




app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT + '!');
    console.log('To start visual debugging open this url in your contemporary browser: http://localhost:' + PORT);
    urlOpener('http://localhost:' + PORT);
});
var jsonPpacketsToProcess = [];
var prodAnswers = [];
var packetsGetterCallback;

var messageForClient;

module.exports.getInstance = function () {
    //private strategy variables here;
    return function move(self, world, game, move, callback) {
        packetsGetterCallback = callback;
        var packetToProcess = {
            packetNum: jsonPpacketsToProcess.length,
            self: self,
            world: world,
            game: game
        };
        jsonPpacketsToProcess.push(JSON.stringify(packetToProcess));
		
		var prodMove = Move.getInstance();
		
		try {
			strategyProd(self,world,game, prodMove);
		} catch(e){
			
			messageForClient += "ERROR IN PROD strategy: "+e;
		};
		
		var objectMoveToSend = {
			speed: prodMove.getSpeed(),
			strafeSpeed: prodMove.getStrafeSpeed(),
			turn: prodMove.getTurn(),
			action: prodMove.getAction(),
			castAngle: prodMove.getCastAngle(),
			minCastDistance: prodMove.getMinCastDistance(),
			maxCastDistance: prodMove.getMaxCastDistance(),
			statusTargetId: prodMove.getStatusTargetId(),
			skillToLearn: prodMove.getSkillToLearn(),
			messages: prodMove.getMessages(),
			packetNum: prodAnswers.length
		};
		
		prodAnswers.push(objectMoveToSend);
		
    }
};
var localRunnerConnected;
module.exports.onLocalRunnerConnected = function () {
    localRunnerConnected = true;
};