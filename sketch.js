let pointerX; // Pointer's X position
let pointerY; // Pointer's Y position, dynamically calculated
let speed = 0; // Current speed of the pointer
let delaySlider, feedbackSlider; // Sliders for delay and feedback
let positions = []; // Array to store positions
let score = 0;
let maxdelay = 10;
let deltas = [];
let delta = 0;
let play = false;


function setup() {
  createCanvas(600, 600);
  pointerX = width / 2;
  pointerY = 0//height / 2;
  textFont('Courier New', 30);
  
  // Create sliders
  delaySlider = createSlider(0, maxdelay - 1, 0, 1);
  delaySlider.position(20,  30);
  feedbackSlider = createSlider(0.1, 5, 1);
  feedbackSlider.position(20,  60);
  for (let i = 0; i < 10; i++) {
    deltas.push(0)
  }
}

function draw() {
  background(100);
  
  if (keyIsPressed) {
    play =true;
  }

    
  if (play == false) {
    textSize(20)
      text("use the left and right arrows\nto try to follow the green line", width/4, height/2);
  }
  
  // Draw the sine waves line
  beginShape();
  noFill();
  stroke('palegreen');
  strokeWeight(2);
  for (let y = 0; y < height; y++) {
    let x = width / 2 + sin(y * 0.01*(2 + cos(0.02*y))) * 50;
    vertex(x, y);
  }
  endShape();
  if (play) {
  speed += deltas[maxdelay - delaySlider.value() - 1]
  print(deltas)
  delta = 0;
  // Update pointer position based on keyboard input
  if (keyIsDown(LEFT_ARROW)) {
    delta = -0.1//* delaySlider.value();
  }
  if (keyIsDown(RIGHT_ARROW)) {
    delta = 0.1//* delaySlider.value();
  }
  

  // Apply delay
  //speed *= (1 - delaySlider.value());
  pointerX += speed*feedbackSlider.value();
  
  // Ensure the pointer stays within canvas
  pointerX = constrain(pointerX, 0, width);
  

  
  // Pointer follows the sine wave y position (feedback steepness)
  let targetY = height / 2 + sin(pointerX * 0.002) * 50;
  //pointerY += (targetY - pointerY) * feedbackSlider.value();
  pointerY += 1
  if (pointerY >= height)
    { textSize(40)
      text("game over\n" + `score: ${score.toFixed(1)}`, width/4, height/2);
      pointerY = height;
      
    } else {
      score += abs(pointerX - width / 2 - sin(pointerY * 0.01*(2 + cos(0.02*pointerY))) * 50)/width
  
  text(`score: ${score.toFixed(1)}`, 10,10)
    }
  // Draw the pointer
  fill(255, 0, 0);
  noStroke();
  ellipse(pointerX, pointerY, 20, 20);
  
  positions.push({x: pointerX, y: pointerY});
  
  deltas.push(delta);
  deltas.shift();
  
  // If the array exceeds the maximum size, remove the oldest position
  // if (positions.length > maxPositions) {
  //   positions.shift();
  // }
  
  // Draw all positions
  noStroke();
  fill(255, 100); // Slightly transparent for older positions
  for (let pos of positions) {
    ellipse(pos.x, pos.y, 5, 5); // Smaller ellipse for the trail
  }
  }

  // Display slider labels
  noStroke();
  fill('palegreen');
  textSize(16);
  text("Delay", delaySlider.x * 2 + delaySlider.width,  45);
  text("Feedback Steepness", feedbackSlider.x * 2 + feedbackSlider.width, 75);
}

