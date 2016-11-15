/**
 * Created by Megabyte on 10.11.2016.
 */
module.exports.getInstance = function (
    id,
    isMe,
    name,
    isStrategyCrashed,
    score,
    faction
) {
    return {
        id                : id,
        isMe              : isMe,
        name              : name,
        isStrategyCrashed : isStrategyCrashed,
        score             : score,
        faction           : faction
    };
};
