/**
 * Created by Megabyte on 10.11.2016.
 */
"use strict";
var ActionType = require('./action-type.js');
var Message = require('./message.js');
module.exports.getInstance = function () {
    var _speed=0;
    var _strafeSpeed=0;
    var _turn=0;
    var _action=0;
    var _castAngle=0;
    var _minCastDistance = 0;
    var _maxCastDistance = 10000.0;
    var _statusTargetId = -1;
    var _skillToLearn=null;
    var _messages=null;
    var ret = {
        setSpeed: function (speed) {
            if(typeof (speed) !== 'number') throw "Wrong value for move.setSpeed: "+speed;
            _speed = speed;
        },
        getSpeed: function () {
            return _speed;
        },
        setStrafeSpeed: function (strafeSpeed) {
            if(typeof (strafeSpeed) !== 'number') throw "Wrong value for move.setStrafeSpeed: "+strafeSpeed;
            _strafeSpeed = strafeSpeed;
        },
        getStrafeSpeed: function () {
            return _strafeSpeed;
        },
        setTurn: function (turn) {
            if(typeof (turn) !== 'number') throw "Wrong value for move.setTurn: "+turn;
            _turn = turn;
        },
        getTurn: function () {
            return _turn;
        },
        setAction: function (action) {
            if(typeof (action) !== 'number') throw "Wrong value for move.setAction: "+speed;
            ActionType.validate(action);
            _action = action;
        },
        getAction: function () {
            return _action;
        },
        setCastAngle: function (castAngle) {
            if(typeof (castAngle) !== 'number') throw "Wrong value for move.setCastAngle: "+castAngle;
            _castAngle = castAngle;
        },
        getCastAngle: function () {
            return _castAngle;
        },
        setMinCastDistance: function (minCastDistance) {
            if(typeof (minCastDistance) !== 'number') throw "Wrong value for move.setMinCastDistance: "+minCastDistance;
            _minCastDistance = minCastDistance;
        },
        getMinCastDistance: function () {
            return _minCastDistance;
        },
        setMaxCastDistance: function (maxCastDistance) {
            if(typeof (maxCastDistance) !== 'number') throw "Wrong value for move.setMaxCastDistance: "+maxCastDistance;
            _maxCastDistance = maxCastDistance;
        },
        getMaxCastDistance: function () {
            return _maxCastDistance;
        },
        setStatusTargetId: function (statusTargetId) {
            if(typeof (statusTargetId) !== 'number') throw "Wrong value for move.setStatusTargetId: "+statusTargetId;
            _statusTargetId = statusTargetId;
        },
        getStatusTargetId: function () {
            return _statusTargetId;
        },
        setSkillToLearn: function (skillToLearn) {
            if(typeof (skillToLearn) !== 'number') throw "Wrong value for move.setSkillToLearn: "+skillToLearn;
            _skillToLearn = skillToLearn;
        },
        getSkillToLearn: function () {
            return _skillToLearn;
        },
        addMessage: function (lane, skillToLearn, rawMessage /*bytes Array*/) {


            if(!_messages){
                _messages = [];
            }
            _messages = Message.getInstance(lane, skillToLearn, rawMessage);
        },
        getMessages: function () {
            return _messages;
        }
    };
    Object.freeze(ret);
    return ret;
};

function validateMessageByte(b, i) {
    if(typeof (v)!=='number') throw 'number expected';
    if(v < 0 || v > 255) throw 'rawMessage element at position '+i+' out of BYTE range (0-255). Value is: '+b;
}