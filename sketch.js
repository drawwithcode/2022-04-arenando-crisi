let btn;
let x = 0;
let y = 0;
let vx = 0;
let vy = 0;

let text1;
let text2;
let text3;
let text4;

let input;

let x1 = 0;
let y1 = 0;
let vx1 = 0;
let vy1 = 0;

let name;

function setup() {
  createCanvas(windowWidth, windowHeight);

  btn = createButton("Click me to draw");
  btn.style("background-color: #009CF5");
  btn.style("color: white");
  btn.style("border-radius: 20px");
  btn.style("font-family: 'Rubik Bubbles', cursive");
  btn.style("font-size: 20px");
  btn.style("width: 200px");
  btn.style("height: 40px");
  btn.mousePressed(changePage);

  text1 = createP("Hello!!");
  text1.style("font-family: 'Rubik Bubbles', cursive");
  text1.style("font-size: 20px");
  text1.position(10, 10);

  text2 = createP(
    "tilt your phone to move the cursor, press a finger to start drawing, release it to stop, make practice with the button in this page"
  );
  text2.style("font-family: 'Rubik Bubbles', cursive");
  text2.style("font-size: 15px");
  text2.position(10, 50);

  text3 = createP(
    "if you want to change color, press two fingers and tilt to search the best color"
  );
  text3.style("font-family: 'Rubik Bubbles', cursive");
  text3.style("font-size: 15px");
  text3.position(10, 110);

  text4 = createP(
    "now, type your name in the box and shake the phone or click the button to start drawing !!"
  );
  text4.style("font-family: 'Rubik Bubbles', cursive");
  text4.style("font-size: 15px");
  text4.position(10, 150);

  x = width / 2 - 100;
  y = height / 2 - 20;

  setShakeThreshold(40);

  input = createInput();
}

function draw() {
  background("#F5BF6A");

  vx += round(rotationY) / 400;
  vy += round(rotationX) / 400;

  x += vx;
  y += vy;

  if (x < 0) {
    x = 0;
    vx = 0;
  } else if (x > width - 200) {
    x = width - 200;
    vx = 0;
  }

  if (y < 0) {
    y = 0;
    vy = 0;
  } else if (y > height - 40) {
    y = height - 40;
    vy = 0;
  }

  btn.position(x, y);

  vx1 += round(rotationY) / 300;
  vy1 += round(rotationX) / 300;

  x1 += vx1;
  y1 += vy1;

  if (x1 < 0) {
    x1 = 0;
    vx1 = 0;
  } else if (x1 > width - 200) {
    x1 = width - 200;
    vx1 = 0;
  }

  if (y1 < 0) {
    y1 = 0;
    vy1 = 0;
  } else if (y1 > height - 40) {
    y1 = height - 40;
    vy1 = 0;
  }

  input.position(x1, y1);
  name = input.value();
}

function deviceShaken() {
  changePage();
}

function changePage() {
  window.open("index2.html", "_self");
  localStorage.setItem("name", name);
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
