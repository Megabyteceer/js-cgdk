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
    
    ownerPlayerId,
    isMe,
    mana,
    maxMana,
    visionRange,
    castRange,
    xp,
    level,
    skills,
    remainingActionCooldownTicks,
    remainingCooldownTicksByAction,
    isMaster,
    messages
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
    ret.ownerPlayerId                  = ownerPlayerId;
    ret.isMe                           = isMe;
    ret.mana                           = mana;
    ret.maxMana                        = maxMana;
    ret.visionRange                    = visionRange;
    ret.castRange                      = castRange;
    ret.xp                             = xp;
    ret.level                          = level;
    ret.skills                         = skills;
    ret.remainingActionCooldownTicks   = remainingActionCooldownTicks;
    ret.remainingCooldownTicksByAction = remainingCooldownTicksByAction;
    ret.isMaster                       = isMaster;
    ret.messages                       = messages;
    
    return ret;
    
};
