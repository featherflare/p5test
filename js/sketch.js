let cw = 400;
let ch = 400;
let txt;
let btn;
let img;
let isHide = false;
function preload() {
  txt = createDiv("This is HTML string!");
  btn = createButton("click");
  img = createImg("assets/thailand.png");
}

function setup() {
  createCanvas(400, 400);
  btn.mousePressed(function () {
    isHide = !isHide;
    if (isHide) {
      img.show();
    } else {
      img.hide();
    }
  });
}

function draw() {
  background(128);
  img.size(60, 60);
  img.position(mouseX + 20, mouseY + 20);
}
