/**
 * Created by Megabyte on 10.11.2016.
 */

LivingUnit = require('./living-unit.js');

module.exports.constructor = function (
    id, x, y, speedX, speedY, angle, faction,
    radius, life, maxLife, statuses, ownerPlayerId, isMe, mana,
    maxMana, visionRange, castRange, xp, level, skills,
    remainingActionCooldownTicks, remainingCooldownTicksByAction, isMaster,
    messages
) {

    LivingUnit.constructor.call(this, id, x, y, speedX, speedY, angle, faction, radius, life, maxLife, statuses);

    this.ownerPlayerId = ownerPlayerId;
    this.isMe = isMe;
    this.mana = mana;
    this.maxMana = maxMana;
    this.visionRange = visionRange;
    this.castRange = castRange;
    this.xp = xp;
    this.level = level;
    this.skills = skills;
    this.remainingActionCooldownTicks = remainingActionCooldownTicks;
    this.remainingCooldownTicksByAction = remainingCooldownTicksByAction;
    this.isMaster = isMaster;
    this.messages = messages;

};