/**
 * Created by Megabyte on 10.11.2016.
 */

var Unit = require('./unit.js');

module.exports.getInstance = function (
    id,
    x,
    y,
    speedX,
    speedY,
    angle,
    faction,
    
    radius
) {

    var ret = Unit.getInstance(
        id,
        x,
        y,
        speedX,
        speedY,
        angle,
        faction
    );
    
    ret.radius = radius;
    
    return ret;
    
};
