/**
 * Created by Megabyte on 13.11.2016.
 */
"use strict";

var ctx;
var cameraX;
var cameraY;
var cameraLinked = true;
(function () {
    var canvas = document.getElementById("debug-canvas");
    ctx = canvas.getContext("2d");
    var onResize = function () {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    onResize();
})();
var zoom = localStorage.getItem('zoom');
if (zoom) {
    zoom = Math.round(parseFloat(zoom) * 10) / 10;
} else {
    zoom = 1;
}
function drawMap(self, world) {
    //clear visualization context
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //set center of camera to self
    if (cameraLinked) {
        cameraX = -self.x + Math.round(ctx.canvas.width / 2) / zoom;
        cameraY = -self.y + Math.round(ctx.canvas.height / 2) / zoom;
    }
    ctx.scale(zoom, zoom);
    ctx.translate(cameraX, cameraY);

    //draw map bounds
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, 4000, 4000);
    world.buildings.some(drawBuilding);
    world.trees.some(drawTree);
    world.wizards.some(drawUnit);
    world.projectiles.some(drawProjectile);
    world.minions.some(drawUnit);
    world.buildings.some(drawHp);
    world.minions.some(drawHp);
    world.wizards.some(drawHp);
    world.wizards.some(drawMana);
    drawUnit(self, 0, 0, '#08a');
}

var factionColors = ['#00a', '#a60', '#aaa'];
var hpColors = ['#0f0', '#8f0', '#ff0', '#f80', '#f00'].reverse();

function drawUnit(unit, i, a, color) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.arc(unit.x, unit.y, unit.radius - 2, unit.angle + 0.2, unit.angle - 0.2);
    ctx.strokeStyle = color || factionColors[unit.faction];
    ctx.stroke();

}
function drawHp(unit) {
    var hpX = unit.maxLife / 2;
    var hpY = unit.y - unit.radius - 9;
    var hpQ = unit.life / unit.maxLife;
    ctx.beginPath();
    ctx.strokeStyle = hpColors[Math.round(hpQ * 4)];
    ctx.moveTo(unit.x - hpX, hpY);
    ctx.lineTo(unit.x - hpX + unit.life, hpY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(unit.x - hpX + unit.life, hpY);
    ctx.strokeStyle = "#aaa";
    ctx.lineTo(unit.x + hpX, hpY);
    ctx.stroke();
}
function drawMana(unit) {
    var hpX = unit.maxMana / 2;
    var hpY = unit.y - unit.radius - 5;
    var hpQ = unit.mana / unit.maxMana;
    ctx.beginPath();
    ctx.strokeStyle = '#0dd';
    ctx.moveTo(unit.x - hpX, hpY);
    ctx.lineTo(unit.x - hpX + unit.mana, hpY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(unit.x - hpX + unit.mana, hpY);
    ctx.strokeStyle = "#aaa";
    ctx.lineTo(unit.x + hpX, hpY);
    ctx.stroke();
}
function drawBuilding(unit) {
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.strokeStyle = '#222';
    ctx.arc(unit.x, unit.y, unit.radius - 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = factionColors[unit.faction];
    ctx.arc(unit.x, unit.y, unit.radius / 2, 0, Math.PI * 2);
    ctx.fill();
    drawHp(unit);
}
function drawTree(unit) {
    ctx.beginPath();
    ctx.fillStyle = '#ada';
    ctx.arc(unit.x, unit.y, unit.radius, 0, Math.PI * 2);
    ctx.fill();
}
function drawProjectile(unit) {
    ctx.beginPath();
    ctx.fillStyle = '#f00';
    ctx.arc(unit.x, unit.y, unit.radius, unit.angle + Math.PI + 0.8, unit.angle + Math.PI - 0.8);
    ctx.fill();
}
function highlightUnit(unit) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(unit.x, unit.y, unit.radius + 6, 0, Math.PI * 2);
    ctx.strokeStyle = '#ee0';
    ctx.stroke();
}
