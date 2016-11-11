/**
 * Created by Megabyte on 09.11.2016.
 */

const ActionType = require('./model/action-type.js');
const BonusType = require('./model/bonus-type.js');
const BuildingType = require('./model/building-type.js');
const LaneType = require('./model/lane-type.js');
const MinionType = require('./model/minion-type.js');
const ProjectileType = require('./model/projectile-type.js');
const SkillType = require('./model/skill-type.js');
const StatusType = require('./model/status-type.js');




//static (available between strategies) variables here





module.exports.getInstance =function () {

    //private strategy variables here;






    return function (self, world, game, move) {

        move.speed = game.wizardForwardSpeed;
        move.strafeSpeed = game.wizardStrafeSpeed;
        move.turn = game.wizardMaxTurnAngle;
        move.action = ActionType.MagicMissile;

    }
};