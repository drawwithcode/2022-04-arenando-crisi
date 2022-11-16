let x = 0;
let y = 0;
let vx = 0;
let vy = 0;
let diam = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(10);

  x = width / 2;
  y = height / 2;
}

function draw() {
  background(255);
  fill(0);

  circle(x, y, diam);

  vx += rotationY / 400;
  vy += rotationX / 400;

  x += vx;
  y += vy;

  if (x < diam / 2) {
    x = diam / 2;
    vx = 0;
  } else if (x > width - diam / 2) {
    x = width - diam / 2;
    vx = 0;
  }

  if (y < diam / 2) {
    y = diam / 2;
    vy = 0;
  } else if (y > height - diam / 2) {
    y = height - diam / 2;
    vy = 0;
  }

  text("rX: " + round(rotationX), 0, 50);
  text("rY: " + round(rotationY), 0, 60);

  text("X: " + x, 0, 80);
  text("Y: " + y, 0, 90);

  text("width: " + width, 0, 110);
  text("height: " + height, 0, 120);
}
