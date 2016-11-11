/**
 * Created by Megabyte on 10.11.2016.
 */
module.exports.getInstance = function (
    id, type, wizardId, playerId, remainingDurationTicks
) {
    return {
        id: id,
        type: type,
        wizardId: wizardId,
        playerId: playerId,
        remainingDurationTicks: remainingDurationTicks
    }
};