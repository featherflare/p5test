<!-- let cx = 400;
let cy = 400;
let r =10;
let x;
let y;
let dx = 1;
let dy = 1;
let spd = 5;
let count = 0;
function setup() {
createCanvas(cx, cy);
x=random(r,cx-r);
y=random(r,cy-r);
angleMode(DEGREES);
angle = random(0,360);
textSize(width / 40);
textAlign(CENTER, CENTER);
}

function draw() {
background(220);
text('Speed:' + spd,40,20)
text('Score:' + count,width - 40,20)
x = x+ sin(angle) * dx * spd;
y = y+ cos(angle) * dy * spd;
ball(x,y)
myCursor(x,y);
if (x > width - r || x < r) {
dx = dx * -1;
}
if (y > height - r || y < r) {
dy = dy * -1;
}
}

function keyPressed() {
if ( keyIsPressed && key === "<" && spd > 1) {
spd = spd - 1;
} else if ( keyIsPressed && key === ">" && spd < 20) {
spd = spd + 1;
}
}

function myCursor(x,y) {
let dY = mouseY - y;
let dX = mouseX - x;
let d = sqrt(dX * dX + dY * dY);
cursor(ARROW);
if ( d <= r) {
cursor(HAND);
}
}

function mousePressed() {
let dY = mouseY - y;
let dX = mouseX - x;
let d = sqrt(dX * dX + dY * dY);
if ( d <= r) {
count += 1;
}
}

function ball(x,y) {
let s = r * 2
fill('navy')
ellipse(x,y,s,s)
} -->