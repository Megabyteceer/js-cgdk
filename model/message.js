/**
 * Created by Megabyte on 10.11.2016.
 */
var LaneType = require(__dirname+ '/lane-type.js');
var SkillType = require(__dirname+ '/skill-type.js');
var validateMessageByte = function (b, i) {
    if(typeof b !== 'number') throw 'MessageByte: number expected';
    if(b < 0 || b > 255) throw 'MessageByte: rawMessage element at position ' + i + ' out of BYTE range (0-255). Value is: ' + b;
};
module.exports.getInstance = function (
    lane,
    skillToLearn,
    rawMessage
) {

    if(lane !== null) {
        LaneType.validate(lane);
    }
    if (skillToLearn !== null) {
        SkillType.validate(skillToLearn);
    }

    if(!Array.isArray(rawMessage)) throw "rawMessage: Array expected";
    
    rawMessage.some(validateMessageByte);
    return {
        lane         : lane,
        skillToLearn : skillToLearn,
        rawMessage   : rawMessage
    };
    
};
