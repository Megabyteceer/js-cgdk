/**
 * Created by Megabyte on 10.11.2016.
 */

module.exports.constructor = function () {
    this.speed=0;
    this.strafeSpeed=0;
    this.turn=0;
    this.action=0;
    this.castAngle=0;
    this.minCastDistance = 0;
    this.maxCastDistance = 10000.0;
    this.statusTargetId = -1;
    this.skillToLearn=null;
    this.messages=null;
}