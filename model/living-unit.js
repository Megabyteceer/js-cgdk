/**
 * Created by Megabyte on 10.11.2016.
 */
CircularUnit = require('./circular-unit.js');
module.exports.getInstance = function (
    id, x, y, speedX, speedY, angle, faction,
    radius, life, maxLife, statuses
) {
    return CircularUnit.getInstance(id, x, y, speedX, speedY, angle, faction,
        radius, life, maxLife, statuses )
};