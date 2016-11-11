/**
 * Created by Megabyte on 10.11.2016.
 */
module.exports.constructor = function (
    lane, skillToLearn, rawMessage
) {
    this.lane = lane;
    this.skillToLearn = skillToLearn;
    this.rawMessage = rawMessage;
};