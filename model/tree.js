/**
 * Created by Megabyte on 10.11.2016.
 */

LivingUnit = require('./living-unit.js');

module.exports.getInstance = function (
    id, x, y, speedX, speedY, angle, faction, radius, life, maxLife, statuses
){
   return LivingUnit.getInstance(id, x, y, speedX, speedY, angle, faction, radius, life, maxLife, statuses);
};
