var Particle = function (pos,vel, lifespan) {
  this.pos = pos.copy();
  this.vel = vel.copy();
  this.acc = createVector();
  this.lifespan=lifespan;
}

Particle.prototype.update = function() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.lifespan -= 2.5;
      this.acc.mult(0);
}


Particle.prototype.applyForce = function(f) {
    this.acc.add(f);
}


Particle.prototype.isDead = function () {
    if (this.lifespan <= 0.0) {
        return true;
    } else {
        return false;
    }
}



var Rocket = function (pos,vel,r,lifespan) {
  this.rocketParticle = new Particle(pos,vel,lifespan);
  this.r = r;

}

Rocket.prototype.run = function(acc) {
  this.rocketParticle.applyForce(acc);
  this.rocketParticle.update();
  this.show();

}

Rocket.prototype.isDead = function() {
  return this.rocketParticle.isDead();
}

Rocket.prototype.show = function() {
  stroke(0,100);
  fill(255,200);
  if(!this.rocketParticle.isDead()){
    beginShape();
    var pos = this.rocketParticle.pos;
    var angle = this.rocketParticle.vel.heading();
    vertex(pos.x + this.r * cos(angle +      PI/12) ,pos.y + this.r * sin(angle +      PI/12));
    vertex(pos.x + this.r * cos(angle + PI - PI/12) ,pos.y + this.r * sin(angle + PI - PI/12));
    vertex(pos.x + this.r * cos(angle + PI + PI/12) ,pos.y + this.r * sin(angle + PI + PI/12));
    vertex(pos.x + this.r * cos(angle -      PI/12) ,pos.y + this.r * sin(angle -      PI/12));
    endShape();
  }
}




var Fire = function (pos) {

  this.particles = []
  this.clr =  color(random(0,255),random(0,255),random(0,255));
  var rot = random(-PI/8,PI/8)
  funcID= int(random(0,func.length));
  for (var i = 0; i < 200; i++) {
    var rand = p5.Vector.random2D().mult(randomGaussian(1.5,0.5));
    rand = rand.mult(func[funcID](rand.heading()))
	  rand = rand.rotate(rot);
    this.particles.push(new Particle(pos, rand,150))
  }
}

Fire.prototype.run = function(acc) {

  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].applyForce(acc)
    this.particles[i].update();
  }
  this.show();
}

Fire.prototype.isDead = function() {

  return this.particles[0].isDead();
}

Fire.prototype.show = function(){
  fill(this.clr);
  noStroke()
  if(!this.isDead()){
    for (var i = 0; i < this.particles.length; i++) {
      ellipse( this.particles[i].pos.x, this.particles[i].pos.y,2);
    }
  }
}

var FireWork = function () {
  this.obj = new Rocket(
		createVector(random(50,width-50),7*height/8),
		createVector(random(-4,4),	random(-0.045,-0.020) * height),
		10,
		random(40,50));;
    this.rocketState=true;
}
FireWork.prototype.isDead = function (acc) {
  return this.dead;
}

FireWork.prototype.run = function (acc) {
if(!this.isDead())
  if(this.rocketState) {
    this.obj.run(acc);
    this.rocketState = ! this.obj.isDead();
    if(!this.rocketState){
      this.obj= new Fire(this.obj.rocketParticle.pos)
    }
  } else {
    this.obj.run(acc.copy().mult(0.03));
    if(this.obj.isDead()) this.dead = true;
  }
}
