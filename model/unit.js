/**
 * Created by Megabyte on 10.11.2016.
 */

var pool = {};
var getAngleTo = function (x, y) {
	var a;
    if(typeof x === 'number'){
        a = Math.atan2(y - this.y, x - this.x) - this.angle;
    } else {
        a = Math.atan2(x.y - this.y, x.x - this.x) - this.angle;
	}
	if (a < -Math.PI) {
		return a + 2 * Math.PI
	} else if (a > Math.PI) {
		return a - 2 * Math.PI
	}
};
var getDistanceTo = function (x, y) {
    var dx, dy;
    if(typeof x === 'number') {
        dx = x - this.x;
        dy = y - this.y;
    } else {
        dx = x.x - this.x;
        dy = x.y - this.y;
    }
    
    return Math.sqrt(dx * dx + dy * dy);
};
module.exports.getInstance = function (
    id,
    x,
    y,
    speedX,
    speedY,
    angle,
    faction
) {
    var ret;
    if (pool.hasOwnProperty(id)) {
        ret = pool[id];
        ret.x = x;
        ret.y = y;
        ret.speedX = speedX;
        ret.speedY = speedY;
        ret.angle = angle;
        ret.faction = faction;
    } else {
        ret = {
            id: id,
            x: x,
            y: y,
            speedX: speedX,
            speedY: speedY,
            angle: angle,
            faction: faction
        };
        ret.getAngleTo = getAngleTo.bind(ret);
        ret.getDistanceTo = getDistanceTo.bind(ret);
        pool[id] = ret;
    }
    return ret;
};
