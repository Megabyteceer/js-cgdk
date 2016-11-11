/**
 * Created by Megabyte on 10.11.2016.
 */


module.exports.constructor = function (
    tickIndex, tickCount, width, height, players, wizards,
    minions, projectiles, bonuses, buildings, trees
) {
    this.tickIndex = tickIndex;
    this.tickCount = tickCount;
    this.width = width;
    this.height = height;

    this.players =players;
    this.wizards = wizards;
    this.minions = minions;
    this.projectiles =projectiles;
    this.bonuses = bonuses;
    this.buildings = buildings;
    this.trees = trees;
};


