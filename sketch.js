function setup() {
  createCanvas(400, 400);
  noStroke();
  fill(40,245,200);
}

function draw() {
  background(200,150,245);

  // distance between squares
  let jump = 40;
  
  // two for loops are needed to make a grid of squares
  // the outer loop controls how many rows are made
  // the inner loop controls how many columns are made
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      
      rect(x * jump + 10, y * jump + 10, 20, 20);
      
    }
  }
}