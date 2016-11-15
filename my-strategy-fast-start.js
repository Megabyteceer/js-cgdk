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
var WAYPOINT_RADIUS = 100.0;

var LOW_HP_FACTOR = 0.25;

module.exports.getInstance = function () {

    //private strategy variables here;


    /**
     * Ключевые точки для каждой линии, позволяющие упростить управление перемещением волшебника.
     * <p>
     * Если всё хорошо, двигаемся к следующей точке и атакуем противников.
     * Если осталось мало жизненной энергии, отступаем к предыдущей точке.
     */
    var waypointsByLane = [];
    var __r;
    var rand = function (max) {
        __r = ((__r * (33)) + 831);
        __r %= 12147483647;
        if (max !== undefined) {
            return Math.ceil(__r / 491) % max;
        }
        return Math.ceil(__r / 493);
    };
    var nextBoolean = function () {
        return (rand() & 1) === 0;
    };


    var lane;
    var waypoints = [];


    /**
     * Основной метод стратегии, осуществляющий управление волшебником.
     * Вызывается каждый тик для каждого волшебника.
     *
     * @param self  Волшебник, которым данный метод будет осуществлять управление.
     * @param world Текущее состояние мира.
     * @param game  Различные игровые константы.
     * @param move  Результатом работы метода является изменение полей данного объекта.
     */
    var initialized;

    var self, world, game, move;

    var moveFunction = function (self, world, game, move) {


        if (!initialized) {

            initializeStrategy(self, game);
            initialized = true;
        }
        initializeTick(self, world, game, move);

        // Постоянно двигаемся из-стороны в сторону, чтобы по нам было сложнее попасть.
        // Считаете, что сможете придумать более эффективный алгоритм уклонения? Попробуйте! ;)
        move.setStrafeSpeed(nextBoolean() ? game.wizardStrafeSpeed : -game.wizardStrafeSpeed);

        // Если осталось мало жизненной энергии, отступаем к предыдущей ключевой точке на линии.
        if (self.life < self.maxLife * LOW_HP_FACTOR) {
            goTo(getPreviousWaypoint());
            return;
        }

        var nearestTarget = getNearestTarget();

        // Если видим противника ...
        if (nearestTarget) {
            var distance = self.getDistanceTo(nearestTarget);

            // ... и он в пределах досягаемости наших заклинаний, ...
            if (distance <= self.castRange) {
                var angle = self.getAngleTo(nearestTarget);

                // ... то поворачиваемся к цели.
                move.setTurn(angle);

                // Если цель перед нами, ...
                if (Math.abs(angle) < game.staffSector / 2.0) {
                    // ... то атакуем.
                    move.setAction(ActionType.MagicMissile);
                    move.setCastAngle(angle);
                    move.setMinCastDistance(distance - nearestTarget.radius + game.magicMissileRadius);
                }

                return;
            }
        }

        // Если нет других действий, просто продвигаемся вперёд.
        goTo(getNextWaypoint());


    };


    /**
     * Инциализируем стратегию.
     * <p>
     * Для этих целей обычно можно использовать конструктор, однако в данном случае мы хотим инициализировать генератор
     * случайных чисел значением, полученным от симулятора игры.
     */

    var initializeStrategy = function (self, game) {
        __r = game.randomSeed;
        var mapSize = game.mapSize;

        waypointsByLane[LaneType.Middle] = [
            {x: 100.0, y: mapSize - 100.0},
            nextBoolean()
                ? {x: 600.0, y: mapSize - 200.0}
                : {x: 200.0, y: mapSize - 600.0},
            {x: 800.0, y: mapSize - 800.0},
            {x: mapSize - 600.0, y: 600.0}
        ];

        waypointsByLane[LaneType.Top] = [
            {x: 100.0, y: mapSize - 100.0},
            {x: 100.0, y: mapSize - 400.0},
            {x: 200.0, y: mapSize - 800.0},
            {x: 200.0, y: mapSize * 0.75},
            {x: 200.0, y: mapSize * 0.5},
            {x: 200.0, y: mapSize * 0.25},
            {x: 200.0, y: 200.0},
            {x: mapSize * 0.25, y: 200.0},
            {x: mapSize * 0.5, y: 200.0},
            {x: mapSize * 0.75, y: 200.0},
            {x: mapSize - 200.0, y: 200.0}
        ];

        waypointsByLane[LaneType.Bottom] = [
            {x: 100.0, y: mapSize - 100.0},
            {x: 400.0, y: mapSize - 100.0},
            {x: 800.0, y: mapSize - 200.0},
            {x: mapSize * 0.25, y: mapSize - 200.0},
            {x: mapSize * 0.5, y: mapSize - 200.0},
            {x: mapSize * 0.75, y: mapSize - 200.0},
            {x: mapSize - 200.0, y: mapSize - 200.0},
            {x: mapSize - 200.0, y: mapSize * 0.75},
            {x: mapSize - 200.0, y: mapSize * 0.5},
            {x: mapSize - 200.0, y: mapSize * 0.25},
            {x: mapSize - 200.0, y: 200.0}
        ];

        switch (self.id) {
            case 1:
            case 2:
            case 6:
            case 7:
                lane = LaneType.Top;
                break;
            case 3:
            case 8:
                lane = LaneType.Middle;
                break;
            case 4:
            case 5:
            case 9:
            case 10:
                lane = LaneType.Bottom;
                break;
            default:
        }

        waypoints = waypointsByLane[lane];
    };

    /**
     * Сохраняем все входные данные в полях замыкания упрощения доступа к ним.
     */
    var initializeTick = function (self_, world_, game_, move_) {
        self = self_;
        world = world_;
        game = game_;
        move = move_;
    };

    var getDistanceBetween = function (from, to) {
        var dx = from.x - to.x;
        var dy = from.y - to.y;
        return Math.sqrt(dx * dx + dy * dy);
    };


    /**
     * Данный метод предполагает, что все ключевые точки на линии упорядочены по уменьшению дистанции до последней
     * ключевой точки. Перебирая их по порядку, находим первую попавшуюся точку, которая находится ближе к последней
     * точке на линии, чем волшебник. Это и будет следующей ключевой точкой.
     * <p>
     * Дополнительно проверяем, не находится ли волшебник достаточно близко к какой-либо из ключевых точек. Если это
     * так, то мы сразу возвращаем следующую ключевую точку.
     */
    var getNextWaypoint = function () {
        var lastWaypointIndex = waypoints.length - 1;
        var lastWaypoint = waypoints[lastWaypointIndex];

        for (var waypointIndex = 0; waypointIndex < lastWaypointIndex; ++waypointIndex) {
            var waypoint = waypoints[waypointIndex];

            if (getDistanceBetween(waypoint, self) <= WAYPOINT_RADIUS) {
                return waypoints[waypointIndex + 1];
            }

            if (getDistanceBetween(lastWaypoint, waypoint) < getDistanceBetween(lastWaypoint, self)) {
                return waypoint;
            }
        }

        return lastWaypoint;
    };

    /**
     * Действие данного метода абсолютно идентично действию метода {@code getNextWaypoint}, если перевернуть массив
     * {@code waypoints}.
     */
    var getPreviousWaypoint = function () {
        var firstWaypoint = waypoints[0];

        for (var waypointIndex = waypoints.length - 1; waypointIndex > 0; --waypointIndex) {
            var waypoint = waypoints[waypointIndex];

            if (getDistanceBetween(waypoint, self) <= WAYPOINT_RADIUS) {
                return waypoints[waypointIndex - 1];
            }

            if (getDistanceBetween(firstWaypoint, waypoint) < getDistanceBetween(firstWaypoint, self)) {
                return waypoint;
            }
        }

        return firstWaypoint;
    };

    /**
     * Простейший способ перемещения волшебника.
     */
    var goTo = function (point) {
        var angle = self.getAngleTo(point.x, point.y);

        move.setTurn(angle);

        if (Math.abs(angle) < (game.staffSector / 4.0)) {
            move.setSpeed(game.wizardForwardSpeed);
        }
    };

    /**
     * Находим ближайшую цель для атаки, независимо от её типа и других характеристик.
     */
    var getNearestTarget = function () {
        var targets = world.buildings.concat(world.wizards, world.minions);

        var nearestTarget = null;
        var nearestTargetDistance = Number.MAX_VALUE;

        targets.some(function (target) {

            if (target.faction === Faction.Neutral || target.faction === self.faction) {
                return;
            }

            var distance = self.getDistanceTo(target);

            if (distance < nearestTargetDistance) {
                nearestTarget = target;
                nearestTargetDistance = distance;
            }
        });

        return nearestTarget;
    };


    return moveFunction; //возвращаем функцию move, чтобы runner мог ее вызывать
};