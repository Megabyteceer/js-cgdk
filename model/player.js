/**
 * Created by Megabyte on 10.11.2016.
 */
module.exports.constructor = function (
    id, isMe, name, isStrategyCrashed, score, faction
) {
    this.id = id;
    this.isMe = isMe;
    this.name = name;
    this.isStrategyCrashed = isStrategyCrashed;
    this.score = score;
    this.faction = faction;
};