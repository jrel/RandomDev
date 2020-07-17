
function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  // var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}
var RANDOM_OBSTACLE = 0.3;
// How many columns and rows?
var cols = 25;
var rows = 25;

// This will the 2D array
var grid = new Array(cols);

// Open and closed set
var openSet = [];
var closedSet = [];

// Start and end
var start;
var end;

// Width and height of each cell of grid
var w, h;

// The road taken
var path = [];

function setup() {
  createCanvas(400, 400);
  console.log('A*');

  // Grid cell size
  w = width / cols;
  h = height / rows;

  

  for (var i = 0; i < cols; i++) {
	grid[i] = new Array(rows);
    for (var j = 0; j < rows; j++) {
      grid[i][j] = initSpot(i, j,Math.random() < RANDOM_OBSTACLE);
    }
  }
   start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  
  start.g = 0;
  start.obstacles = false;
  end.obstacles = false;
  
  
 


  
  
  // All the neighbors
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
	  grid[i][j].h = heuristic(grid[i][j], end);
    }
  }



  openSet.push(start);
}

function draw() {

	// Am I still searching?
	if (openSet.length > 0) {

    // Best next option
	var current = openSet[getSmalestIndex(openSet,function(a,b){return b.f < a.f;})];

    // Did I finish?
    if (current === end) {
      noLoop();
      console.log("DONE!");
    }

    // Best option moves from openSet to closedSet
    removeFromArray(openSet, current);
    closedSet.push(current);

    // Check all the neighbors
    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
		 var neighbor = neighbors[i];

     

      // Valid next spot?
      if (!closedSet.includes(neighbor) && !neighbor.obstacles) {
        var tempG = current.g + heuristic(neighbor, current);

		var tempF = tempG + neighbor.h;
        // Is this a better path than before?
        var newPath = false;
		for(var k= 0; k < neighbors.length ; k++) console.log(tempF < neighbors[k].f);
        if (openSet.includes(neighbor)) {
          if (tempF < neighbor.f) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        // Yes, it's a better path
        if (newPath) {
          neighbor.previous = current;
        }
      }

    }
  // Uh oh, no solution
  } else {
    console.log('no solution');
    noLoop();
    return;
  }

  // Draw current state of everything
  background(255);

	for (var i = 0; i < cols; i++) 
		drawSpot(grid[i])
  

	drawSpot(closedSet,color( 255,0, 0, 50));
	drawSpot(openSet,color(0, 255, 0, 50));
	drawPath(current);



}


function drawSpot(spotArray,color){
	for (var i = 0; i < spotArray.length; i++)
		spotArray[i].show(color);
}

function drawPath(current){
	noFill();
	stroke(255, 0, 200);
	strokeWeight(w / 2);
	beginShape();
	for (var temp = current; temp;	temp = temp.previous) 
		vertex(temp.i * w + w / 2, temp.j * h + h / 2);
	
	endShape();
}
