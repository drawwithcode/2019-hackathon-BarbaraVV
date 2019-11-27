// variable of the image
var myImage;

// variables of the sound
var mySong;
var analyzer;

function preload() {

  myImage = loadImage("./assets/world.png"); // load image
  mySong = loadSound("./assets/TG1_bumper.mp3"); // load the song
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // analyze the sound file
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

  // the song continues playing
  mySong.loop();
}

function draw() {

  var circle = 200; // variable of the circles
  var rotation; // variable of one rotation
  var fr = 0.00001 + 0.0000000005 * (mouseY); // variable of the frequency
  var cont = 0;
  var r; // variable of the radius

  var volume = 0; // variable of the volume of the sound

  background("black"); // colour of the background

  // start and stop the song
  if (mouseX > -10) {
    if (mySong.isPlaying() == false) {
      mySong.play();
    }
    volume = analyzer.getLevel();
    volume = map(volume, 0, 1, 0, height / 10);
  } else {
    background("white");
    mySong.stop();
  }

  // draw the circles
  translate(width / 2, height / 2);
  rotate(radians(rotation));

  ellipseMode(RADIUS);

  for (var i = 0; i < 500; i++) {
    circle = 200 + 90 * sin(millis() * fr * i);
    r = map(circle, 100, 150, 8, 4);
    noStroke();
    fill("mediumBlue");
    ellipse(circle * cos(i), circle * sin(i), r / (volume / 30), r * (volume / 100));
    rotation = rotation + 1;
  }

  // draw the image of the world
  push();
  image(myImage, -100, -100, 200, 200);
  pop();

  // draw the text
  push();
  textFont("Roboto Mono");
  textSize(30);
  fill("darkOrange");
  text("TELEGIORNALE", frameCount, 0);
  pop();

}

// respond to window resizing
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}
