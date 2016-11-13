/**
 * Created by Megabyte on 12.11.2016.
 */
"use strict";

var module = {exports:{}};
function require(name) {
    /*mocked*/
}

var captureModuleExports;

(function () {
    var game;


    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }



    captureModuleExports = function captureModuleExports_(destinationName) {
        var exports = module.exports;
        Object.defineProperty(window, destinationName, {
            get: function () {
                return exports
            }, set: function (v) {/*skip*/
            }
        });

        module.exports ={};
    }

    var strategy;
    var initInterval = setInterval(function () {
        if (window.hasOwnProperty('Strategy')) {
            strategy = window.Strategy.getInstance();
            clearInterval(initInterval);
            setInterval(processFrame,1);
        }
    }, 100);

    var busy;
    function processFrame() {
        if(busy)return;
        busy = true;
        $.getJSON('packet.JSON/-1', function (data) {

            if (data === 'close-window') {
                return;
                window.close();
            }

            busy = false;

            var self = parseWizard(data.self);
            if (data.game) {
                game = data.game;
            }

            var world = data.world;

            world.wizards = world.wizards.map(parseWizard);
            world.trees = world.trees.map(parseTree);
            world.projectiles = world.projectiles.map(parseProjectile);
            world.players = world.players.map(parsePlayer);
            world.minions = world.minions.map(parseMinion);
            world.buildings = world.buildings.map(parseBuilding);
            world.bonuses = world.bonuses.map(parseBonus);
            world.myPlayer = parseWizard(world.myPlayer);


            var move = Move.getInstance();

            drawMap(self, world);
            
            strategy(self, world, game, move);


            var objectMoveToSend = {
                speed:move.getSpeed(),
                strafeSpeed:move.getStrafeSpeed(),
                turn:move.getTurn(),
                action:move.getAction(),
                castAngle:move.getCastAngle(),
                minCastDistance:move.getMinCastDistance(),
                maxCastDistance:move.getMaxCastDistance(),
                statusTargetId:move.getStatusTargetId(),
                skillToLearn:move.getSkillToLearn(),
                messages:move.getMessages(),
                packetNum:data.packetNum
            };



            $.ajax({
                type: "POST",
                url: '/move',
                data: JSON.stringify(objectMoveToSend),
                success: function () {

                },
                contentType: "application/json; charset=utf-8"
            });
            
        });

    };


    function parseWizard(data) {
        if (!data) return null;
        return Wizard.getInstance(
            data.id,
            data.x,
            data.y,
            data.speedX,
            data.speedY,
            data.angle,
            data.faction,
            data.radius,
            data.life,
            data. maxLife,
            data.statuses,

            data.ownerPlayerId,
            data.isMe,
            data.mana,
            data.maxMana,
            data.visionRange,
            data.castRange,
            data.xp,
            data.level,
            data.skills,
            data.remainingActionCooldownTicks,
            data.remainingCooldownTicksByAction,
            data.isMaster,
            data.messages
        );
    };
    function parseTree(data) {
        if (!data) return null;
        return Tree.getInstance(
            data.id,
            data.x,
            data.y,
            data.speedX,
            data.speedY,
            data.angle,
            data.faction,
            data.radius,
            data.life,
            data.maxLife,
            data.statuses
        );
    };

    function parseProjectile(data) {
        if (!data) return null;
        return Projectile.getInstance(
            data.id,
            data.x,
            data.y,
            data.speedX,
            data.speedY,
            data.angle,
            data.faction,
            data.radius,

            data.type,
            data.ownerUnitId,
            data.ownerPlayerId

        );
    };
    function parsePlayer(data) {
        if (!data) return null;
        return Player.getInstance(
            data.id,
            data.isMe,
            data.name,
            data.isStrategyCrashed,
            data.score,
            data.faction

        );
    };
    function parseMinion(data) {
        if (!data) return null;
        return Minion.getInstance(
            data.id,
            data.x,
            data.y,
            data.speedX,
            data.speedY,
            data.angle,
            data.faction,
            data.radius,
            data.life,
            data.maxLife,
            data.statuses

        );
    };
    function parseBuilding(data) {
        if (!data) return null;
        return Building.getInstance(
            data.id,
            data.x,
            data.y,
            data.speedX,
            data.speedY,
            data.angle,
            data.faction,
            data.radius,
            data.life,
            data.maxLife,
            data.statuses,

            data.type,
            data.visionRange,
            data.attackRange,
            data.damage,
            data.cooldownTicks,
            data.remainingActionCooldownTicks

        );
    };

    function parseBonus(data) {
        if (!data) return null;
        return Bonus.getInstance(
            data.id,
            data.x,
            data.y,
            data.speedX,
            data.speedY,
            data.angle,
            data.faction,
            data.radius,

            data.type

        );
    };











})();