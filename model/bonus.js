/**
 * Created by Megabyte on 10.11.2016.
 */
CircularUnit = require('./circular-unit.js');
module.exports.constructor = function (
    id, x, y, speedX, speedY, angle, faction,
    radius, type
) {
    CircularUnit.constructor.call(this, id, x, y, speedX, speedY, angle, faction, radius);
    this.type = type;
};