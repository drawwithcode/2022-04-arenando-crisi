let x = 0;
let y = 0;
let vx = 0;
let vy = 0;

let color = 0;
let vcolor = 0;

let saturation = 0;
let vsaturation = 0;

let diam = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //textSize(10);

  x = width / 2;
  y = height / 2;

  color = height / 2;
  saturation = width / 2;

  colorMode(HSB, height, width, 100);

  noStroke();
}

function draw() {
  background(255);

  fill(color, saturation, 100);

  if (touches.length == 0) {
    drawBall();
  } else if (touches.length == 1) {
    colorChoice();
  } else if (touches.length == 2) {
    satChoice();
  }
}

function drawBall() {
  vsaturation = 0;
  vcolor = 0;

  circle(x, y, diam); //circle movement

  vx += round(rotationY) / 400;
  vy += round(rotationX) / 400;

  x += vx;
  y += vy;

  //circle constrain
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

  /*text("rX: " + round(rotationX), 0, 50);
  text("rY: " + round(rotationY), 0, 60);

  text("X: " + round(x), 0, 80);
  text("Y: " + round(y), 0, 90);

  text("width: " + width, 0, 110);
  text("height: " + height, 0, 120);

  text("vX: " + vx, 0, 140);
  text("vY: " + vy, 0, 150);*/
}

function colorChoice() {
  vx = 0;
  vy = 0;

  vcolor += round(rotationX) / 400;

  color += vcolor;

  if (color < diam / 2) {
    color = diam / 2;
    vcolor = 0;
  } else if (color > height - diam / 2) {
    color = height - diam / 2;
    vcolor = 0;
  }

  rect(0, 0, saturation, color);
}

function satChoice() {
  vx = 0;
  vy = 0;

  vsaturation += round(rotationY) / 400;

  saturation += vsaturation;

  if (saturation < diam / 2) {
    saturation = diam / 2;
    vsaturation = 0;
  } else if (saturation > width - diam / 2) {
    saturation = width - diam / 2;
    vsaturation = 0;
  }

  rect(0, 0, saturation, color);
}

// ask for permissions on iOS
function touchEnded() {
  // check that those functions exist
  // if they exist it means we are
  // on iOS and we can request the permissions
  if (DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
    DeviceOrientationEvent.requestPermission();
  }
}
