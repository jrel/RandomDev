// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Part 1: https://youtu.be/aKYlikFAV4k
// Part 2: https://youtu.be/EaZxUCWAjb0
// Part 3: https://youtu.be/jwRT4PCT6RU

// An object to describe a spot in the grid

initSpot= function (i, j,obstacles = false) {
	return {
		i : i,
		j :	 j,
		obstacles : obstacles,
  
		g : Infinity,
		h : undefined,
		get f(){return this.g + this.h},
		
		neighbors :[],

		previous : undefined,


		show : function(col) {
			if (this.obstacles) {      
				fill(0);
				noStroke();
				rect(this.i * w , this.j * h , w , h );
			} else if (col){
				fill(col);
				rect(this.i * w, this.j * h, w, h);
			}
		},
		
		addNeighbors : function(grid) {
			this.neighbors=  findNeighbors(grid,this.i,this.j);
		}
	}
}
