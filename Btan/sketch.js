var balls = 10
var ROUNDS = 1

var b

var mousePos
var angle

var bTam
var STATE = "WAIT"

var boundaries = []

function setup() {
  createCanvas(400, 800)
  bTam = createVector(width/2, height-40)
  boundaries.push(new Boundary(0,0,10,height,false,0))
  boundaries.push(new Boundary(width-10,0,10,height,false,0))
  boundaries.push(new Boundary(0,0,width,10,false,0))
  boundaries.push(new Boundary(20,20,100,100,true,1))
}

function draw() {
  background(51)



  boundaries.forEach(function(elem){elem.update()})

  noStroke()
  beginShape(bTam)
  fill(255)
  vertex(bTam.x-10,bTam.y+40)
  vertex(bTam.x+10,bTam.y+40)
  vertex(bTam.x,bTam.y)
  endShape(bTam)

  if(STATE === "A"){
    fill(255,255,255,50)
    ellipse(mousePos.x-10,mousePos.y-10,20)
    angle = Math.atan2(constrain(mouseY,0,bTam.y-50)-bTam.y ,(width - mouseX)- bTam.x);
    var d = 0.5 * dist(
      constrain(mousePos.x,0,width),
      constrain(mousePos.y,0,bTam.y),
      constrain(width - mouseX,0,width),
      constrain(mouseY,0,bTam.y)
    )
    stroke(0)
    strokeWeight(2)
    line(bTam.x,bTam.y,bTam.x + d*cos(angle),bTam.y+d*sin(angle))
  }

  if(STATE === "SEND_BALLS"){
    b = new Balls(10,bTam,angle)
    STATE = "GAME"
  }

  if(STATE ==="GAME"){
    b.update()
  }
}

function mousePressed(){
  if(STATE === "WAIT"){
    mousePos = createVector(mouseX,mouseY)
    STATE = "A"
  }
}

function mouseReleased(){
  if(STATE === "A")
  STATE = "SEND_BALLS"
}

function Boundary(x,y,w,h,special,value){
  this.x = x
  this.y = y
  this.w = w
  this.h = h
  this.special = special
  this.value = value

  this.update = function(){
    if(this.special)
      text(this.value,x + w/2,y+h/2 )
    fill(255,0,0)
    noStroke()
    rect(this.x,this.y,this.w,this.h)
  }
  this.collision = function (pos,r) {
    return  pos.x +r > this.x  &&  pos.x -r < this.x + this.w && pos.y + r > this.y   &&  pos.y -r <  this.y +this.h
  }
  this.normal=function(pos){
    winner = createVector(pos.x,this.y)
    dW = dist(winner.x,winner.y,pos.x,pos.y)

    temp = createVector(this.x,pos.y)
    d=  dist(temp.x,temp.y,pos.x,pos.y)
    if(d < dW){
      dW = d
      winner = temp
    }

    temp = createVector(pos.x+this.w,this.y)
    d=  dist(temp.x,temp.y,pos.x,pos.y)
    if(d < dW){ç
      dW = d
      winner = temp
    }

    temp = createVector(this.x,pos.y+this.h)
    d=  dist(temp.x,temp.y,pos.x,pos.y)
    if(d < dW){
      dW = d
      winner = temp
    }


    return winner.sub(pos).normalize()

  }
}
function Balls(n,pos,angle) {
  this.toSendBalls = n
  this.sendedBalls = 0
  this.posInitial = pos
  this.balls = []
  this.pos = pos.copy()
  this.vel = createVector(5 * cos(angle),5*sin(angle))
  this.fase = 5

  this.update = function(){

    for(var i = this.balls.length-1; i >=0; i--){
      if(!this.balls[i].update())
        this.balls.splice(i,1)
    }
    if(this.sendedBalls< this.toSendBalls){
      if(this.fase === 0){
        this.balls.push(new Ball(this.pos,this.vel))
        this.sendedBalls++
        this.fase = 5
      }
      this.fase--
    }
  }
}
function Ball(pos,vel){
  this.radius =5
  this.pos = pos.copy()
  this.vel = vel.copy()
  this.update = function(){
    this.pos.add(this.vel)
    var ball = this
    boundaries.forEach(function(elem){
      if(elem.collision(ball.pos,ball.radius)){
          coiso = elem.normal(ball.pos)
          if(coiso.x !==0){
            ball.vel.x = ball.vel.x * -1
          }else {
            ball.vel.y = ball.vel.y * -1
          }

      }
    })
    fill(255)
    ellipse(this.pos.x ,this.pos.y ,  this.radius *2)

        return true

  }
}
