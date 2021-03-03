
console.log("running application");
var oldTimeStamp;
var oldtick = 0;
var image = new Image();
image.src="Background.png";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
var enemies = [];
function spawnEnemy(){
    var randomXPosition = Math.floor(Math.random() * (5000 - 0) + 0);
    var randomYPosition = Math.floor(Math.random() * (5000 - 0) + 0);
    var enemy = {
	alive:true,
	hp:1,
	xpos:randomXPosition,
	ypos:randomYPosition,
	bulletid:100
	}
    enemies.push(enemy);
}

var ship = new Image();
ship.src="Ship.png";
for(var n = 0;n< 100;n++) {
	spawnEnemy();
}
var bullet = new Image();
bullet.src="ShipBullet.png";
var enemy = new Image();
enemy.src="EnemyShip.png";
var delta = 0;
var fps = 1000/60;
var angle = 0; 
var trueangle = angle/360;
var x = 2;
var y = 20;
camerax = 0;
cameray = 0;
bulletx = 30;
bullety = -5;
right = false;
left = false;
up = false;
down = false;
rightarrow = false;
leftarrow = false;
uparrow = false;
downarrow = false;
spacebar = false;
lastFrameTimeMs = 0;
GameMapSizeW = 640;
GameMapSizeH = 480;
scaleX =GameMapSizeW/640;
console.log(scaleX);
var canvasMain = createCanvasObject(GameMapSizeW,GameMapSizeH,0);
var canvasPlayers = createCanvasObject(640,480,1);
var canvasBullets = createCanvasObject(640,480,2);
contextMain = canvasMain.getContext("2d");
contextPlayers = canvasPlayers.getContext("2d");
contextBullets = canvasPlayers.getContext("2d");
contextMain.webkitImageSmoothingEnabled = false;
contextMain.mozImageSmoothingEnabled = false;
contextPlayers.imageSmoothingEnabled = false;
contextPlayers.webkitImageSmoothingEnabled = false;
contextPlayers.mozImageSmoothingEnabled = false;
contextPlayers.imageSmoothingEnabled = false;
document.body.style.background="url('Background.png')";
var lastFrameTimeMs = 0;
window.onload = main();
function main() {
 requestAnimationFrame(gameloop);
}
function createCanvasObject(width,height,index) {
var canvasMain = document.createElement("canvas");
canvasMain.width = width;
canvasMain.height = height;
canvasMain.style.zIndex="0";
canvasMain.setAttribute("class","canvas");
canvasMain.style.position="absolute";
canvasMain.style.left="0";
canvasMain.style.height="100%";
canvasMain.style.width="100%";
canvasMain.style.top="0";
canvasMain.style.zIndex = index;
document.body.appendChild(canvasMain);
return canvasMain;
}
function gameloop(timestamp) {
delta += timestamp - lastFrameTimeMs;
lastFrameTimeMs = timestamp;
while(delta >= fps) {
delta -= fps;
update();
}
draw();
requestAnimationFrame(gameloop);
}
var bullets = [];

function draw() {
document.body.style.backgroundPosition="-"+ camerax.toString()+"px " + "-" + cameray.toString() + "px";
contextPlayers.beginPath();
contextPlayers.strokeStyle="white";
bulletx+=0.5;
contextBullets.drawImage(bullet,bulletx,bullety);
for(var i = 0; i < bullets.length; i++) {
contextBullets.drawImage(bullet,bullets[i].xx,bullets[i].yy);
}
for(var o = 0; o < enemies.length;o++) {
	contextPlayers.drawImage(enemy,enemies[o].xpos-camerax,enemies[o].ypos-cameray);
}
contextPlayers.restore();
contextPlayers.save();
contextPlayers.translate(x+10,y+10);
contextPlayers.rotate(angle * Math.PI / 180);
contextPlayers.drawImage(ship,40/-2,40/-2);
contextPlayers.restore();
contextPlayers.stroke();
contextPlayers.closePath();
pushed = 1;
}
function checkmovement() {
if(right == true) {
if(x < 320) {
x +=2;
}
else {
camerax +=2;

}
}
if(left == true) {
if(x < 320 ) {
x -=2;
}
else {
camerax -=2;
if(camerax == 0) {
	x-=2;
}
}
}
if(up == true) {
if(y < 240) {
y -=2;
}
else {
cameray -=2;
if(cameray == 0) {
	y-=2;
}
}
}
if(down == true) {
if(y < 240) {
y +=2;
}
else {
cameray +=2;

}
}
if(rightarrow == true) {
angle+=1;
}
if(leftarrow == true) {
angle-=1;
}
if(spacebar == true) {
bullets.push({xx:x+20*Math.cos(angle*(Math.PI/180)),yy:(y+5)+20*Math.sin(angle*(Math.PI/180)),trajx:Math.cos(angle*(Math.PI/180)),trajy:Math.sin(angle*(Math.PI/180))});
spacebar = false;
}
if(angle > 360) {
angle = 0;
}
if(angle < 0) {
angle = 360;
}
}
function update() {
contextPlayers.clearRect(0,0,640,480);
checkmovement();

for(var i = 0; i < bullets.length; i++) {
bullets[i].xx += bullets[i].trajx;
bullets[i].yy += bullets[i].trajy;
}
}
i = 0;
xx = 0;
pushed = 0;
document.addEventListener("keydown", movementController);
document.addEventListener("keyup", movementControllerOff);
function movementController(e) {
switch(e.keyCode) {
case 68: 
right = true;
break;
case 65: 
left = true;
break;
case 87: 
up = true;
break;
case 83: 
down = true;
break;
case 39: 
rightarrow = true;
break;
case 37: 
leftarrow = true;
break;
case 32: 
spacebar = false;
break;
}
}

function movementControllerOff(e) {
switch(e.keyCode) {
case 68: 
right = false;
break;
case 65: 
left = false;
break;
case 87: 
up = false;
break;
case 83: 
down = false;
break;
case 39: 
rightarrow = false;
break;
case 37: 
leftarrow = false;
break;
case 32: 
spacebar = true;
break;
}
}
