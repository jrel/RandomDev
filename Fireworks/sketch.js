var fireWorks;
var func;
var GRAVITY;
var stars = [];

var angle;


function setup() {

	createCanvas(windowWidth, windowHeight);
	background(0,128,255);
	GRAVITY = createVector(0,0.1);

	fireWorks= [];

	func = [hearth,sphereFunc,star];

	for (var i = 25; i >=0 ; i--) {
		stars.push(new StarObject())
	}

}

function draw() {




	background(0,0,0,50);
	for (var i = stars.length-1; i >=0 ; i--) {
		stars[i].show()
	}
	for (var i = fireWorks.length-1; i >=0 ; i--) {
		fireWorks[i].run(GRAVITY)
		if(fireWorks[i].isDead())
			fireWorks.slice(i,1);


	}
	if(random(0,1)< 0.015)
		fireWorks.push(new FireWork())

}


function hearth (angle){
	return 	-0.5 * (2 - 2 * sin(angle) +sin(angle) * ((sqrt(Math.abs(cos(angle))))/(sin(angle)+1.4)))
}

function sphereFunc(angle){
	return 1;
}

function star(angle){
	return pow(sin(1.2 * angle),2)+ pow(cos(6 * angle),3)


}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
