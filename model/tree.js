/**
 * Created by Megabyte on 10.11.2016.
 */

LivingUnit = require('./living-unit.js');

module.exports.constructor = function (
    id, x, y, speedX, speedY, angle, faction, radius, life, maxLife, statuses
){
    LivingUnit.constructor.call(this, id, x, y, speedX, speedY, angle, faction, radius, life, maxLife, statuses);
};
