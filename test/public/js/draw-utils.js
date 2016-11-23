/**
 * Created by Megabyte on 13.11.2016.
 */
"use strict";
var getItem = function (name, def) {
	try {
		if (typeof(Storage) !== "undefined") {
			if (localStorage.hasOwnProperty(name)) {
				return JSON.parse(localStorage[name]);
			}
		}
	} catch (e) {}
	return def;
}

var setItem = function (name, val) {
	try {
		if (val === false) {
			val = '';
		}
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem(name, JSON.stringify(val));
		}
	} catch (e) {}
}

var ctx;
var cameraX = 0;
var cameraY = 0;

var cameraRight = 0;
var cameraLeft = 0;
var cameraBottom = 0;
var cameraTop = 0;

var cameraLinked = true;
var __highlightArray;
var debugText = [];
function addDebugLine(t) {
	debugText.push(t);
}
function higlightArray(a) {
	if (a !== __highlightArray) {
		__highlightArray = a;
		drawMap();
	}

}

(function () {
	var canvas = document.getElementById("debug-canvas");
	ctx = canvas.getContext("2d");
	var onResize = function () {
		ctx.canvas.width = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
		drawMap();
	};
	window.addEventListener("resize", onResize);
	onResize();
})();

var zoom = getItem('zoom', 1);
var _curZoom = zoom;
zoom = Math.round(parseFloat(zoom) * 10) / 10;

if (_curZoom !== zoom) {
	_curZoom = zoom;
	drawMap();
}

var flyText;
var drawFlyText;

(function () {

	var allFlyText = [];

	var updateText = function (t) {
		t.y -= 1 / zoom;
		t.phase--;
		return t.phase > 0;
	}

	var drawText = function (t) {
		ctx.fillStyle = t.c;
		ctx.fillText(t.t, t.x, t.y);
	}

	drawFlyText = function () {
		ctx.textAlign = "center";
		ctx.font = (16 / zoom) + "px Arial";
		allFlyText.some(drawText);
	}

	setInterval(function () {
		allFlyText = allFlyText.filter(updateText);
	}, 20);

	flyText = function (txt, x, y, color) {

		if (typeof(txt) !== 'string') {
			txt = '' + txt;
		}

		if (!color)
			color = '#0f0';

		allFlyText.push({
			phase : 30 + txt.length * 3,
			x : x,
			y : y,
			c : color,
			t : txt
		});

	}

})();

var debugX, debugY;

var __currentDebugText;

var controlsInited = false;
function drawMap() {
	debugText.length = 0;

	if (typeof(world) === 'undefined')
		return;
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

	cameraRight = ctx.canvas.width / zoom - cameraX;
	cameraLeft = -cameraX;

	cameraBottom = ctx.canvas.height / zoom - cameraY;
	cameraTop = -cameraY;

	if (__highlightArray) {
		__highlightArray.some(highlightUnit);
	}
	//draw map bounds
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 4;
	ctx.strokeRect(0, 0, MAP_SIZE, MAP_SIZE);
	/*
	drawLine(0,0,MAP_SIZE, MAP_SIZE, '#666', 2);
	drawLine(0,MAP_SIZE,MAP_SIZE, 0, '#666', 2);
	*/
	walls.some(drawWall);
	avoiders.some(drawAvoider);
	
	if (buildingsEnemies) {
		buildingsEnemies.some(drawBuilding);
	}
	if (world.buildings) {
		world.buildings.some(drawBuilding);
		world.trees.some(drawTree);
		world.wizards.some(drawWizard);
		world.projectiles.some(drawProjectile);
		world.minions.some(drawUnit);
		world.buildings.some(drawHp);
		world.trees.some(drawHp);
		world.minions.some(drawHp);
		world.wizards.some(drawHp);
		world.wizards.some(drawMana);
		drawWizard(self, 0, 0, '#08a');

		ctx.strokeStyle = '#4f4';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(selfX, selfY, self.castRange, 0, PI2);
		ctx.stroke();
	}

	if (!controlsInited && (typeof(selfX) !== 'undefined')) {
		controlsInited = true;
		var controls = $('#debug-controls');

		var debugControls = ['avoiders', 'attractors', '', 'walls', '', '', ''];
		debugControls.some(function (n, i) {

			var id = 'dc' + i;

			debugCalcSteps[i] = getItem(id, true);

			controls.append('<div id="' + id + '">' + n + ' <input ' + (debugCalcSteps[i] ? 'checked' : '') + ' type="checkbox" name="vehicle"></div>');
			$('#' + id).on('click', function (e) {
				e.preventDefault();
				debugCalcSteps[i] = !debugCalcSteps[i];
				setItem(id, debugCalcSteps[i]);
				$('#' + id + ' input').attr('checked', debugCalcSteps[i]);
				if (paused) {
					drawMap();
				}
			});
		});
	}

	if (typeof(selfX) !== 'undefined') {

		if (debugX) {
			selfPointVal = evaluatePointForMovingTo(debugX, debugY, true);
			for (var x = -200; x <= 200; x += 12) {
				for (var y = -200; y <= 200; y += 12) {
					evaluatePointForMovingTo(debugX + x, debugY + y);
				}
			}

		}

		var dt = debugText.join('<br>');
		if (__currentDebugText !== dt) {
			__currentDebugText = dt;
			$('#debug-text').html(dt);
		}
	}
}

var factionColors = ['#00a', '#a60', '#aaa'];
var hpColors = ['#0f0', '#8f0', '#ff0', '#f80', '#f00'].reverse();

function drawWall(w,i,a,c) {
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.arc(w.x, w.y, w.r - 1, 0, PI2);
	ctx.strokeStyle = c||'#ccc';
	ctx.stroke();
}
function drawAvoider(w,i,a,c) {
	
	var pow = w.pow;
	
	ctx.beginPath();
	ctx.lineWidth = pow*2;
	ctx.arc(w.x, w.y, w.r - pow, 0, PI2);
	ctx.strokeStyle = c||'rgba(255,0,0,'+(w.pow)+')';
	ctx.stroke();
	
	if ((w.r - 0.5 - avoidRadiusShift) > 0) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.arc(w.x, w.y, w.r - 0.5 - avoidRadiusShift, 0, PI2);
		ctx.strokeStyle = c||'rgba(255,0,0,'+(w.pow)+')';
		ctx.stroke();
	}
}

function drawUnit(unit, i, a, color) {
	ctx.beginPath();
	ctx.lineWidth = 4;
	ctx.arc(unit.x, unit.y, unit.radius - 2, unit.angle + 0.2, unit.angle - 0.2);
	ctx.strokeStyle = color || factionColors[unit.faction];
	ctx.stroke();
}
function drawWizard(unit, i, a, color) {
	ctx.strokeStyle = color || factionColors[unit.faction];
	ctx.beginPath();
	ctx.lineWidth = 4;
	ctx.arc(unit.x, unit.y, unit.radius - 2, unit.angle + 0.2, unit.angle - 0.2);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(unit.x, unit.y, unit.radius - 10, unit.angle + 0.2, unit.angle - 0.2);
	ctx.stroke();

	if (unit.remainingActionCooldownTicks < 1) {
		ctx.fillStyle = ctx.strokeStyle;
		ctx.beginPath();
		ctx.arc(unit.x, unit.y, unit.radius - 20, unit.angle + 0.2, unit.angle - 0.2);
		ctx.fill();

	}
}

function drawHp(unit) {
	ctx.lineWidth = 6 / zoom;
	var hpX = unit.maxLife / 2;
	var hpY = unit.y - unit.radius - 9 / zoom;
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
/*
	if (unit.keepDist) {
		ctx.strokeStyle = 'rgba(255,0,0,0.2)';
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.arc(unit.x, unit.y, unit.keepDist, 0, PI2);
		ctx.stroke();
	}
	if (unit.avoidDist) {
		ctx.strokeStyle = 'rgba(0,0,0,0.2)';
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.arc(unit.x, unit.y, unit.avoidDist, 0, PI2);
		ctx.stroke();
	}*/
	
	if (unit.isEnemy) {
		if (willBeKilledSoon(unit)) {
			
			drawLine(unit.x-50, unit.y-50,unit.x+50, unit.y+50, '#000', 4);
			drawLine(unit.x-50, unit.y+50,unit.x+50, unit.y-50, '#000', 4);
			
			
			
		}
		
		
	}

}
function drawMana(unit) {
	ctx.lineWidth = 6 / zoom;
	var hpX = unit.maxMana / 2;
	var hpY = unit.y - unit.radius - 5 / zoom;
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
	ctx.fillStyle = unit.isEnemy?'#f60':'#0f6';
	ctx.arc(unit.x, unit.y, unit.radius, unit.angle + Math.PI + 0.8, unit.angle + Math.PI - 0.8);
	ctx.fill();
}

var _arrowLen = 140;
function highlightUnit(unit, color) {

	ctx.strokeStyle = color || '#ee0';
	ctx.lineWidth = 5;

	var x = Math.min(cameraRight - _arrowLen, Math.max(cameraLeft + _arrowLen, unit.x));
	var y = Math.min(cameraBottom - _arrowLen, Math.max(cameraTop + _arrowLen, unit.y));

	if ((x !== unit.x) || (y !== unit.y)) {
		ctx.beginPath();
		ctx.moveTo(x, y);
		var a = atan2(unit.y - y, unit.x - x);
		x += Math.cos(a) * _arrowLen;
		y += Math.sin(a) * _arrowLen;
		ctx.lineTo(x, y);
		ctx.arc(x, y, 15, 0, Math.PI * 2);
		ctx.stroke();
	}

	ctx.beginPath();
	ctx.arc(unit.x, unit.y, unit.radius + 6, 0, Math.PI * 2);

	ctx.stroke();
}

var __prevSingleHighlighted;
function highlightSingleUnit(u) {
	if (__prevSingleHighlighted) {
		highlightUnit(u, '#fff');
	}
	__prevSingleHighlighted = u;
	highlightUnit(u, '#f00');
}

function drawRelAngle(relAngle, color) {
	ctx.strokeStyle = color || "#999";
	ctx.lineWidth = 2;

	ctx.beginPath();
	ctx.moveTo(selfX, selfY);
	ctx.lineTo(selfX + Math.cos(relAngle + self.angle) * 140, selfY + Math.sin(relAngle + self.angle) * 140);
	ctx.stroke();
}

function drawLine(x1, y1, x2, y2, c, w) {
	ctx.beginPath();
	ctx.strokeStyle = c;
	ctx.lineWidth = w;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}