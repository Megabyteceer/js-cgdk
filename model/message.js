/**
 * Created by Megabyte on 10.11.2016.
 */
var LaneType = require('./lane-type.js');
var SkillType = require('./skill-type.js');

module.exports.getInstance = function (
    lane, skillToLearn, rawMessage
) {

    LaneType.validate(lane);
    SkillType.validate(skillToLearn);
    if(!Array.isArray(rawMessage)){
        throw "rawMessage - Array expected";
    }
    rawMessage.some(validateMessageByte);


    return {
        lane: lane,
        skillToLearn: skillToLearn,
        rawMessage: rawMessage
    }
};