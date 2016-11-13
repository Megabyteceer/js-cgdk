/**
 * Created by Megabyte on 13.11.2016.
 */
"use strict";



var ctx;



(function () {

    var canvas = document.getElementById("debug-canvas");
    ctx = canvas.getContext("2d");
    var onResize = function () {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", onResize);
    onResize();
    
})();

function drawMap(self, world) {
//clear visualization context
ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//set center of camera to self
ctx.translate(-self.x + Math.round(ctx.canvas.width / 2), -self.y + Math.round(ctx.canvas.height / 2));

//draw map bounds
ctx.strokeStyle = '#000';
ctx.lineWidth = 4;
ctx.strokeRect(0, 0, 4000, 4000);

//draw all buildings
ctx.strokeStyle = "#a60";
world.buildings.some(drawUnit);

//draw all trees
ctx.strokeStyle = "#aaa";
world.trees.some(drawUnit);

//draw wizards
ctx.strokeStyle = "#0fa";
world.wizards.some(drawUnit);

//draw projectiles
ctx.strokeStyle = "#f48";
world.projectiles.some(drawUnit);

//draw minions
ctx.strokeStyle = "#f5f";
world.minions.some(drawUnit);


//draw self unit
drawUnit(self, '#0f0');
}





function drawUnit (unit, color) {
    ctx.beginPath();
    ctx.arc(unit.x, unit.y, unit.radius, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    if (color) {
        ctx.strokeStyle = color;
    }
    ctx.stroke();
}



