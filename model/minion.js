/**
 * Created by Megabyte on 10.11.2016.
 */
var LivingUnit = require(__dirname+ '/living-unit.js');
module.exports.getInstance = function (
    id,
    x,
    y,
    speedX,
    speedY,
    angle,
    faction,
    radius,
    life,
    maxLife,
    statuses,
    
    type,
    visionRange,
    damage,
    cooldownTicks,
    remainingActionCooldownTicks
) {
    var ret = LivingUnit.getInstance(
        id,
        x,
        y,
        speedX,
        speedY,
        angle,
        faction,
        radius,
        life,
        maxLife,
        statuses
    );
    
    ret.type                         = type;
    ret.visionRange                  = visionRange;
    ret.damage                       = damage;
    ret.cooldownTicks                = cooldownTicks;
    ret.remainingActionCooldownTicks = remainingActionCooldownTicks;
    
    return ret;
    
};
