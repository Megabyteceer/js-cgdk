/**
 * Created by Megabyte on 12.11.2016.
 */

var Move = require('./../model/move.js');


var PORT = 25643;

try {
    var express = require('express');
    var bodyParser = require('body-parser');
    var urlOpener = require('open');
} catch (e){
    console.log("\n\n\nError: Looks like you didn't install modules for visual debugger.");
    console.log("please try file 'install-visual-debugger.bat' to fix problem.");
    console.log("you should have 'nmp' installed first.");
    process.exit(10002);
}

var app = express();

var autoCloseToken = Math.random();

app.use(bodyParser.json());
app.use('/css',express.static(__dirname+'/public/css'));
app.use('/js',express.static(__dirname+'/public/js'));
app.use('/js',express.static(__dirname+'/..'));
app.use('/js',express.static(__dirname+'/../node_modules/jquery/dist'));

app.get('/', function(req, res){
    res.sendFile('mock.html', { root: __dirname + "/public/" } );
});

/*
app.get('/js/my-strategy.js', function(req, res){
    res.sendFile(__dirname+'/my-strategy.js');
});
*/


var responseObject;
var requestedPacket;
function answerPacket() {

    var pn = (requestedPacket>=0)?requestedPacket:currentPacket;

    if (packetsToProcess[pn]) {
        responseObject.end(JSON.stringify(packetsToProcess[pn]));
    } else {
        setTimeout(answerPacket, 1);
    }
}


var currentPacket=0;
app.get('/packet.JSON/:packetNum', function (req, res) {
    requestedPacket = parseInt(req.params.packetNum);
    responseObject = res;
    answerPacket();

});


app.post('/move', function (req, res) {
    currentPacket = Math.max(currentPacket, req.body.packetNum+1);

    var move = Move.getInstance();
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

    packetsGetterCallback(move);
    res.end();
})

app.listen(PORT, function () {
    console.log('Example app listening on port '+PORT+'!');
    //console.log('To start visual debugging open this url in your contemporary browser: http://localhost:'+PORT);
    urlOpener('http://localhost:'+PORT);
});

var packetsToProcess = [];
var packetsGetterCallback;

module.exports.getInstance =function () {
    //private strategy variables here;
    return function move(self, world, game, move, callback) {
        packetsGetterCallback = callback;

        var packetToProcess = {
            packetNum:packetsToProcess.length,
            self:self,
            world:world,
            game:game
        };
        packetsToProcess.push(packetToProcess);
    }
};