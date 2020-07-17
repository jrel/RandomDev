function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

 findNeighbors= function(array2D,x,y){
	 
	var deltas =  [{x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1},{x:-1, y:0},{x:1, y:0},{x:-1, y:1},  {x:0, y:1},  {x:1, y:1} ];

	var neighbors =  [];
	
	for (var i = 0; i 	< deltas.length ; i++){
		var tempX = x+deltas[i].x;
		var tempY = y+deltas[i].y 
	
		if ( tempX >= 0 && tempX < array2D.length && tempY >= 0 && tempY < array2D[x].length )
			neighbors.push(array2D[tempX][tempY]);
	}
	return neighbors;
}


getSmalestIndex = function(array,cmp){
	var winner = 0;
    for (var i = 1; i < array.length; i++) {
      if (cmp(array[i].f,array[winner].f)) {
        winner = i;
      }
    }
	return winner
}

