/**
 * Created by Megabyte on 10.11.2016.
 */

Unit = require('./unit.js');

module.exports.constructor = function (
    id, x, y, speedX, speedY, angle, faction,
    radius, life, maxLife, statuses
) {
    Unit.constructor.call(this, id, x, y, speedX, speedY, angle, faction);
    this.radius = radius;
    this.life = life;
    this.maxLife = maxLife;
    this.statuses = statuses;
};