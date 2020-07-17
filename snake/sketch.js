snake= new Snake();
var scl = 10;
function setup() {
	createCanvas(300,300);
	frameRate(10);
	
}

function draw() {

	background(51);
	snake.update()
	snake.draw();

}


	function keyPressed(){
		switch(keyCode){
			case UP_ARROW: snake.dir(0,-1);break;
			case DOWN_ARROW: snake.dir(0,1);break;
			case LEFT_ARROW: snake.dir(-1,0);break;
			case RIGHT_ARROW: snake.dir(1,0);break;
		}	
	}