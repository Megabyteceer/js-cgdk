/**
 * Created by Megabyte on 10.11.2016.
 */
module.exports.getInstance = function (
    lane, skillToLearn, rawMessage
) {
    return {
        lane: lane,
        skillToLearn: skillToLearn,
        rawMessage: rawMessage
    }
};