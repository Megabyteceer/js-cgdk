/**
 * Created by Megabyte on 10.11.2016.
 */
var CircularUnit = require('./circular-unit.js');
module.exports.getInstance = function (
    id,
    x,
    y,
    speedX,
    speedY,
    angle,
    faction,
    radius,
    
    type
) {
    
    var ret = CircularUnit.getInstance(
        id,
        x,
        y,
        speedX,
        speedY,
        angle,
        faction,
        radius
    );
    
    ret.type = type;
    
    return ret;
    
};
