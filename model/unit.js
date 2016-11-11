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
};