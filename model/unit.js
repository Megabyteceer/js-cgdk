/**
 * Created by Megabyte on 10.11.2016.
 */
module.exports.constructor = function (
    id, x, y, speedX, speedY, angle, faction
) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.angle = angle;
    this.faction = faction;
    this.getAngleTo = getAngleTo.bind(this);
    this.getDistanceTo = getDistanceTo.bind(this);
};

var getAngleTo = function (x,y) {
    if (typeof (x)=== 'number') {
        return Math.atan2(y-this.y, x-this.x)-this.angle;
    } else {
        return Math.atan2(x.y-this.y, x.x-this.x)-this.angle;
    }
}
var getDistanceTo = function (x,y) {
    var dx,dy;
    if (typeof (x)=== 'number') {
        dx = x-this.x;
        dy = y-this.y;
    } else {
        dx = x.x-this.x;
        dy = x.y-this.y;
    }
    return Math.sqrt(dx*dx-dy*dy);
}