/**
 * Created by Megabyte on 12.11.2016.
 */
"use strict";

var __dirname = '';
var module = {exports: {}};
function require(name) {
    /*mocked*/
}
var captureModuleExports;
var paused = getItem('paused',false);
var lastPackedProcessed;
var maxPackedProcessed = 0;
var debugCalcSteps=[];

var world={};


(function () {
    var game;
    var status = $('#status');
    status.on("click", function () {
        var f = prompt('Enter frame to go [0-' + maxPackedProcessed + ']:');
        if (parseInt(f).toString() === f) {
            lastPackedProcessed = Math.max(0, Math.min(maxPackedProcessed, parseInt(f)));
            processFrame(lastPackedProcessed);
        }
    });




    function doPause() {
        if (!paused) {
            playPause();
        }
    }
    function playPause() {
        paused = !paused;
        setItem('paused', paused);
        $("#play-stop").text(paused ? '▶' : '❚❚');
    }
    playPause();
    playPause();

    function prevStep() {
        doPause();
        lastPackedProcessed--;
        processFrame(lastPackedProcessed);
    }
    function nextStep() {
        doPause();
        lastPackedProcessed++;
        processFrame(lastPackedProcessed);
    }
    function zoomIn() {
        zoom *= 1.3333333;
        setItem('zoom', zoom);
        drawMap();
    }
    function zoomOut() {
        zoom /= 1.3333333;
        setItem('zoom', zoom);
        drawMap();
    }
    $(document).keypress(function (e) {
        switch (e.keyCode) {
            case 1073:
            case 44:
                prevStep();
                break;
            case 1102:
            case 46:
                nextStep();
                break;
            case 32:
                playPause();
                break;
        }
    });
    var px, py;
    var pressed;
    var $canvas = $('#debug-canvas');


    $canvas.mousemove(function (e) {
        if (pressed) {
            cameraLinked = false;
            cameraX += (e.clientX - px) / zoom;
            cameraY += (e.clientY - py) / zoom;
            drawMap();

            px = e.clientX;
            py = e.clientY;
        } else {
            debugX = (e.clientX) / zoom - cameraX;
            debugY = (e.clientY) / zoom - cameraY;
            if(paused)drawMap();
        }
    });
    $canvas.mousedown(function (e) {
        if (typeof(calcX)!== 'undefined') {
            window.calcX = (e.clientX) / zoom - cameraX;
            window.calcY = (e.clientY) / zoom - cameraY;
            var u;

            var lists = [world.wizards, world.minions, world.buildings, world.trees, world.projectiles];
            lists.some(function (a) {
                if (u)return true;
                u = (a.filter(_unitOnWay))[0];
            });
            if (u) {
                console.dir(u);
            }
        };

        pressed = true;
        px = e.clientX;
        py = e.clientY;
    });
    $canvas.mouseup(function (e) {
        pressed = false;
    });

    $("#link-camera").on("click", function () {
        cameraLinked = true;
    });
    $("#zoom-in").on("click", zoomIn);
    $("#zoom-out").on("click", zoomOut);
    $("#play-stop").on("click", playPause);
    $("#prev-step").on("click", prevStep);
    $("#next-step").on("click", nextStep);
    $("#re-step").on("click", function () {
        doPause();
        processFrame(lastPackedProcessed);
    });

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
        if (!window[destinationName]) {
            var exports = module.exports;
            Object.defineProperty(window, destinationName, {
                get: function () {
                    return exports
                },
                set: function (v) {/*skip*/
                }
            });
        }
        module.exports = {};
    };
    var strategy;
    var leasOneFrameGetted = false;
    var initInterval = setInterval(function () {
        if (window.hasOwnProperty('Strategy')) {
            strategy = window.Strategy.getInstance();
            clearInterval(initInterval);
            setInterval(function () {
                if (!paused || !leasOneFrameGetted) {
                    leasOneFrameGetted = true;
                    processFrame();
                }
            }, 1);
        }
    }, 100);
    var busy;
    
    function processFrame(packetNum) {

       


        if (!packetNum) {
            packetNum = -1;
        }
        if (busy)return;
        busy = true;
        $.getJSON('packet.JSON/' + packetNum, function (data) {
            if (data === 'close-window') {
                return;
                window.close();
            }
            busy = false;
            window.self = parseWizard(data.self);
            if (data.game) {
                game = data.game;
            }
            var _world = data.world;
            world.wizards = _world.wizards.map(parseWizard);
            world.trees = _world.trees.map(parseTree);
            world.projectiles = _world.projectiles.map(parseProjectile);
            world.players = _world.players.map(parsePlayer);
            world.minions = _world.minions.map(parseMinion);
            world.buildings = _world.buildings.map(parseBuilding);
            world.bonuses = _world.bonuses.map(parseBonus);
            world.myPlayer = parseWizard(_world.myPlayer);

            var move = Move.getInstance();
            drawMap();


            strategy(self, world, game, move);

            drawFlyText();

            var objectMoveToSend = {
                speed: move.getSpeed(),
                strafeSpeed: move.getStrafeSpeed(),
                turn: move.getTurn(),
                action: move.getAction(),
                castAngle: move.getCastAngle(),
                minCastDistance: move.getMinCastDistance(),
                maxCastDistance: move.getMaxCastDistance(),
                statusTargetId: move.getStatusTargetId(),
                skillToLearn: move.getSkillToLearn(),
                messages: move.getMessages(),
                packetNum: data.packetNum
            };
            if (objectMoveToSend.speed === null)throw 'wrong value';
            lastPackedProcessed = data.packetNum;
            maxPackedProcessed = Math.max(lastPackedProcessed, maxPackedProcessed);
            status.text('step: ' + lastPackedProcessed);
            $.ajax({
                type: "POST",
                url: '/move',
                data: JSON.stringify(objectMoveToSend),
                success: function (d) {
                    if (d) {
                        alert(d);
                        doPause();
                    }
                },
                contentType: "application/json; charset=utf-8"
            });
        });
    }
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
            data.maxLife,
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
    }
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
    }
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
    }
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
    }
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
            data.statuses,
            data.type,
            data.visionRange,
            data.damage,
            data.cooldownTicks,
            data.remainingActionCooldownTicks
        );
    }
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
    }
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
    }
})();