/**
 * Created by Megabyte on 10.11.2016.
 */

module.exports.getInstance = function (
    tickIndex,
    tickCount,
    width,
    height,
    players,
    wizards,
    minions,
    projectiles,
    bonuses,
    buildings,
    trees
) {

    return {
        tickIndex   : tickIndex,
        tickCount   : tickCount,
        width       : width,
        height      : height,
        players     : players,
        wizards     : wizards,
        minions     : minions,
        projectiles : projectiles,
        bonuses     : bonuses,
        buildings   : buildings,
        trees       : trees
    };

};
