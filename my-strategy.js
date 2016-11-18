/**
 * Created by Megabyte on 09.11.2016.
 */
"use strict";
var ActionType = require('./model/action-type.js');
var BonusType = require('./model/bonus-type.js');
var BuildingType = require('./model/building-type.js');
var LaneType = require('./model/lane-type.js');
var MinionType = require('./model/minion-type.js');
var ProjectileType = require('./model/projectile-type.js');
var SkillType = require('./model/skill-type.js');
var StatusType = require('./model/status-type.js');
var Faction = require('./model/faction.js');
//static (available between strategies) variables here

module.exports.getInstance = function () {
    //private strategy variables here;

    return function move(self, world, game, move) {

        move.setSpeed(game.wizardForwardSpeed);
        move.setStrafeSpeed(game.wizardStrafeSpeed);
        move.setTurn(game.wizardMaxTurnAngle);
        move.setAction(ActionType.MagicMissile);

    }
};
