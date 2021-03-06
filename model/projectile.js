/**
 * Created by Megabyte on 10.11.2016.
 */
var CircularUnit = require(__dirname+ '/circular-unit.js');
module.exports.getInstance = function (
    id,
    x,
    y,
    speedX,
    speedY,
    angle,
    faction,
    radius,
    
    type,
    ownerUnitId,
    ownerPlayerId
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
    
    ret.type          = type;
    ret.ownerUnitId   = ownerUnitId;
    ret.ownerPlayerId = ownerPlayerId;
    
    return ret;
    
};
