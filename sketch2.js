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

let pen;
let pencil;
let marker;

let toolselect;

let name = localStorage.getItem("name");

function preload() {
  pen = loadImage("penna.png");
  pencil = loadImage("matita.png");
  marker = loadImage("pennarello.png");
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  //textSize(10);

  imageMode(CORNER);

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

  text1 = createP(name + "'s fantastic drawing");
  text1.style("font-family: 'Rubik Bubbles', cursive");
  text1.style("font-size: 20px");
  text1.position(10, 10);
  text1.style("user-select: none");
}

function touchStarted() {
  if (touches.length == 1) {
    disegno.push(new trace());
  }
  index = disegno.length;
  if (touches.length == 2) {
    toolselect = random(1, 3);
  }
}

function draw() {
  text1.show();
  strokeWeight(5);
  clear();

  fill(color, saturation, 100);
  noStroke();

  if (touches.length == 0) {
    for (let i = 0; i < disegno.length; i++) {
      disegno[i].show();
    }
    ball();
  } else if (touches.length == 2) {
    colorChoice();
  } else if (touches.length == 1) {
    for (let i = 0; i < disegno.length; i++) {
      disegno[i].show();
    }
    ball();
  }

  if (mouseIsPressed == true) {
    disegno[index - 1].record();
  }
}

function ball() {
  vsaturation = 0;
  vcolor = 0;

  if (round(toolselect) == 1) {
    image(pen, x, y - 300, 220, 300);
  } else if (round(toolselect) == 2) {
    image(pencil, x, y - 300, 190, 300);
  } else {
    image(marker, x, y - 300, 190, 300);
  }

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
  text1.hide();

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

  vsaturation += round(rotationY) / 400;

  saturation += vsaturation;

  if (saturation < diam / 2) {
    saturation = diam / 2;
    vsaturation = 0;
  } else if (saturation > width - diam / 2) {
    saturation = width - diam / 2;
    vsaturation = 0;
  }

  stroke(saturation);
  strokeWeight(1);

  circle(saturation, color, 80);
  if (round(toolselect) == 1) {
    image(pen, saturation, color - 300, 220, 300);
  } else if (round(toolselect) == 2) {
    image(pencil, saturation, color - 300, 190, 300);
  } else {
    image(marker, saturation, color - 300, 190, 300);
  }
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
