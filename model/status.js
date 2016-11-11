/**
 * Created by Megabyte on 10.11.2016.
 */
module.exports.constructor = function (
    id, type, wizardId, playerId, remainingDurationTicks
) {
    this.id = id;
    this.type = type;
    this.wizardId = wizardId;
    this.playerId = playerId;
    this.remainingDurationTicks = remainingDurationTicks;
};