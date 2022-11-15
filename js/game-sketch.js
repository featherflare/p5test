let game = {
  bit: 32,
  gx: 10,
  gy: 20,
  time: 0,
  timer: undefined,
  sound: undefined,
  isPlay: false,
  isOver: false,
};

let stars = [];

let meteor = {
  chance: 30,
  file: "assets/meteorite.png",
  img: undefined,
  objs: [],
};

let ship = {
  img: undefined,
  x: undefined,
  y: undefined,
};

function preload() {
  meteor.img = loadImage(meteor.file);
  ship.img = loadImage("assets/spaceship.png");
}

function setup() {
  const { bit, gx, gy } = game;
  createCanvas(bit * gx, bit * gy);
  ship.x = width / 2 - bit / 2;
  ship.y = height - bit;
  initStar();
  gameButton();
  gameSound();
  initMeteors();
}

function draw() {
  background("black");
  renderStar();
  renderMeteors();
  renderShip();
  crashShip();
  renderTime();
  if (game.isOver) {
    renderBanner("GAME OVER");
  } else if (!game.isPlay) {
    renderBanner("PAUSE");
  }
}

function renderTime() {
  textSize(20);
  text("Time: " + game.time, 10, 30);
}

function renderBanner(txt) {
  let s = 40;
  fill(255, 77, 77, 128);
  rectMode(CENTER);
  rect(width / 2, height / 2, width, s * 2);
  fill("snow");
  textSize(s);
  textAlign(CENTER);
  text(txt, width / 2, height / 2 + s / 2.75);
  textAlign(LEFT);
}

function initStar() {
  let { bit, gx, gy } = game;
  let n = gx * gy * bit * 0.02;
  for (let i = 0; i < n; i++) {
    stars.push({
      x: round(random(0, gx * bit)),
      y: round(random(0, gy * bit)),
      r: random(0.2, 3),
    });
  }
}

function renderStar() {
  for (let i = 0; i < stars.length; i++) {
    fill("#ffffe0");
    noStroke();
    circle(stars[i].x, stars[i].y, stars[i].r);
  }
}

function gameSound() {
  game.sound = createAudio("assets/bgm.mp3");
  game.sound.volume(0.1);
  game.sound.autoplay(false);
  game.sound.stop();
}

function startGame() {
  if (game.isPlay) {
    return;
  }
  if (game.isOver) {
    game.time = 0;
    game.isOver = false;
    meteor.objs = [];
    initMeteors();
  }
  game.isPlay = true;
  game.sound.play();
  game.timer = setInterval(() => {
    game.time += 1;
  }, 1000);
}

function pauseGame() {
  if (!game.isPlay) {
    return;
  }
  game.isPlay = false;
  game.sound.pause();
  clearInterval(game.timer);
}

function gameButton() {
  startBtn = createButton("START");
  startBtn.mouseClicked(startGame);
  pauseBtn = createButton("PAUSE");
  pauseBtn.mouseClicked(pauseGame);
}

function initMeteors() {
  let { bit, gy } = game;
  let maxY = ceil(gy / 2) * bit;
  for (let y = 0; y < maxY; y += bit * 2) {
    createMeteorsRow(y);
  }
}

function addMeteorsRow() {
  let { objs } = meteor;
  let nStars = 0;
  for (let i = 0; i < objs.length; i++) {
    if (objs[i].y < game.bit * 2) {
      nStars += 1;
    }
  }
  if (nStars == 0) {
    createMeteorsRow(0);
  }
}

function clearMeteors() {
  let { objs } = meteor;
  for (let i = 0; i < objs.length; i++) {
    if (objs[i].y > height) {
      objs.splice(i, 1);
    }
  }
}

function renderMeteors() {
  let { bit } = game;
  let { objs, img } = meteor;
  for (let i = 0; i < objs.length; i++) {
    image(img, objs[i].x, objs[i].y, bit, bit);
    if (game.isPlay) {
      objs[i].y += 1;
    }
  }
  addMeteorsRow();
  clearMeteors();
  console.log("Size: ", objs.length);
}

function createMeteorsRow(y) {
  for (let x = 0; x < game.gx * game.bit; x += game.bit) {
    let r = random(0, 100);
    if (r < 100 - meteor.chance) {
      continue;
    }
    meteor.objs.push({
      x: x,
      y: y,
    });
  }
}

function renderShip() {
  let { img, x, y } = ship;
  let mv = 2;
  image(img, x, y, game.bit, game.bit);
  if (!game.isPlay) {
    return;
  }
  if (keyIsPressed && (key === "ArrowRight" || key === "d")) {
    if (ship.x == width) {
      ship.x == width;
    }
    ship.x += mv;
  }
  if (keyIsPressed && (key === "ArrowLeft" || key === "a")) {
    if (ship.x == 0) {
      ship.x = 0;
    }
    ship.x -= mv;
  }
  if (keyIsPressed && (key === "ArrowUp" || key === "w")) {
    if (ship.y == 0) {
      ship.y = 0;
    }
    ship.y -= mv;
  }
  if (keyIsPressed && (key === "ArrowDown" || key === "s")) {
    if (ship.y == height - game.bit) {
      ship.y = height - game.bit;
    }
    ship.y += mv;
  }
}

function crashShip() {
  let { objs } = meteor;
  let { bit } = game;
  let offset = round(bit * 0.3);
  for (let i = 0; i < objs.length; i++) {
    let obj = objs[i];
    if (ship.y > obj.y + bit - offset || ship.y + bit < obj.y + offset) {
      continue;
    }
    if (ship.x + bit < obj.x + offset || ship.x > obj.x + bit - offset) {
      continue;
    }
    gameOver();
  }
}

function gameOver() {
  pauseGame();
  game.isOver = true;
}
