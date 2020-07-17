function getVetor(charToPrint,angle){

	pg = createGraphics(100, 100);
	pg.translate(50,50)
	pg.textAlign(CENTER,CENTER);
	pg.fill(0, 0, 255);
	pg.textSize(50);
	pg.text(charToPrint,0,0);
	pg.fill(255, 0, 0);
	pg.ellipse(0,0,1);


	var vetor = pointsVector(0,0,int(25*cos(angle)),int(25*sin(angle)))

	return vetor
}


function pointsVector(x0, y0, x1, y1){
	var dx = Math.abs(x1-x0);
	var dy = Math.abs(y1-y0);
	var sx = (x0 < x1) ? 1 : -1;
	var sy = (y0 < y1) ? 1 : -1;
	var err = dx-dy;

	var points = []

	while(true){
		if(pg.get(50+x0,50+y0).reduce((pv, cv) => pv+cv, 0)!=0)
			points.push([dist(0,0,x0, y0)])

		if ((x0==x1) && (y0==y1)) break;
		var e2 = 2*err;
		if (e2 >-dy){ err -= dy; x0  += sx; }
		if (e2 < dx){ err += dx; y0  += sy; }
   }
   return points;
}
function setup(){
	var dic ={};
	for (var i = 0; i < 2; i=i +0.1) {
		dic[i] =  Math.max.apply(null, getVetor("A",i*PI));
	}
	console.log(dic);
}
