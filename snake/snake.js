
function Snake(){

	this.x = 150;
	this.y = 150;
	
	this.speedX = 1;
	this.speedY = 0;

	
	this.update = function (){
		this.x= this.x+ this.speedX*scl;
		this.y= this.y+ this.speedY*scl;
		
		this.x = constrain(this.x ,0 ,width - scl)
		this.y = constrain(this.y ,0 ,height- scl)
	}
	
	this.dir = function ( x,  y){
		this.speedX= x;
		this.speedY= y;
	}
	
	this.draw = function draw(){
		fill(255);
		rect(this.x,this.y,scl,scl);
	}

}