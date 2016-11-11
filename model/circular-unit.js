/**
 * Created by Megabyte on 10.11.2016.
 */

Unit = require('./unit.js');

module.exports.getInstance = function (
    id, x, y, speedX, speedY, angle, faction,
    radius, life, maxLife, statuses
) {
    var ret = Unit.getInstance(id, x, y, speedX, speedY, angle, faction);
    ret.radius = radius;
    ret.life = life;
    ret.maxLife = maxLife;
    ret.statuses = statuses;
    return ret;
};