/**
 * Created by Megabyte on 10.11.2016.
 */

LivingUnit = require('./living-unit.js');

module.exports.constructor = function (
    id,  x,  y,  speedX,  speedY,  angle, faction,
     radius,  life,  maxLife, statuses, type,  visionRange,
     attackRange,  damage,  cooldownTicks,  remainingActionCooldownTicks
){

    LivingUnit.constructor.call(this, id, x, y, speedX, speedY, angle, faction, radius, life, maxLife, statuses);

    this.type = type;
    this.visionRange = visionRange;
    this.attackRange = attackRange;
    this.damage = damage;
    this.cooldownTicks = cooldownTicks;
    this.remainingActionCooldownTicks = remainingActionCooldownTicks;

};