let x = 0;
let y = 0;
let vx = 0;
let vy = 0;

let color = 0;
let vcolor = 0;

let saturation = 0;
let vsaturation = 0;

let diam = 10;

let disegno = [];

let index;

let cnv;

let btn;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  //textSize(10);

  x = width / 2;
  y = height / 2;

  color = height / 2;
  saturation = width / 2;

  colorMode(HSB, height, width, 100);
  strokeWeight(5);

  btn = createButton("save");
  btn.style("background-color: #F5BF6A");
  btn.style("color: grey");
  btn.style("border-radius: 20px");
  btn.style("font-family: 'Rubik Bubbles', cursive");
  btn.style("font-size: 20px");
  btn.position(width - 100, height - 50);
  btn.mousePressed(save);
  btn.style("user-select: none");
}

function touchStarted() {
  if (touches.length == 1) {
    disegno.push(new trace());
  }
  index = disegno.length;
}

function draw() {
  clear();

  fill(color, saturation, 100);
  noStroke();

  if (touches.length == 0) {
    ball();
    for (let i = 0; i < disegno.length; i++) {
      disegno[i].show();
    }
  } else if (touches.length == 2) {
    colorChoice();
    satChoice();
  } else if (touches.length == 1) {
    ball();
    for (let i = 0; i < disegno.length; i++) {
      disegno[i].show();
    }
  }

  if (mouseIsPressed == true) {
    disegno[index - 1].record();
  }
}

function ball() {
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
  background(255);

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

class trace {
  constructor() {
    this.color = color;
    this.saturation = saturation;
    this.draw = [];
    this.vec;
  }

  record() {
    this.vec = createVector(x, y);
    this.draw.push(this.vec);
  }

  show() {
    noFill();
    stroke(this.color, this.saturation, 100);

    beginShape();
    for (let i = 0; i < this.draw.length; i++) {
      vertex(this.draw[i].x, this.draw[i].y);
    }
    endShape();
  }
}

function save() {
  saveCanvas(cnv, "myCanvas", "jpg");
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
