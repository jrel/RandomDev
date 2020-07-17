var stars = [];

var speed;

function setup() {
  createCanvas(windowWidth ,windowHeight );
  for (var i = 0; i < 1000; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  speed = dist(mouseX, mouseY, width/2, height/2)/25;
  console.log(speed);
  background(0);
  translate(width / 2,height / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}