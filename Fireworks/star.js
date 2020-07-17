var StarObject = function(){
	this.pos = createVector(random(50,width-50),random(0, height/8));

}

StarObject.prototype.alhpa = function (){
	return  randomGaussian(1.2,0.4)
}


StarObject.prototype.show = function(){
	fill(240)
	stroke(240)
	ellipse(this.pos.x,this.pos.y,this.alpha*10)
}
