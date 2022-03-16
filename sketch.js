function gridData() {
	let data = new Array();
	let xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	let ypos = 1;
	let width = 20;
	let height = 20;
	let click = 0;
	
	// iterate for rows	
	for (let row = 0; row < 20; row++) {
		data.push( new Array() );
		
		// iterate for cells/columns inside rows
		for (var column = 0; column < 20; column++) {
			data[row].push({
				x: xpos,
				y: ypos,
				width: width,
				height: height,
				click: click
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width;
		}
		// reset the x position after a row is complete
		xpos = 1;
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height;	
	}
	return data;
}

let mygrid = gridData();	
// I like to log the data to the console for quick debugging
// console.log(mygrid);

let grid = d3.select("#d3sketch")
	.append("svg")
	.attr("width","510px")
	.attr("height","510px");
	
let row = grid.selectAll(".row")
	.data(mygrid)
	.enter().append("g")
	.attr("class", "row");
	
let column = row.selectAll(".square")
	.data(function(d) { return d; })
	.enter().append("rect")
	.attr("class","square")
	.attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
	.style("fill", "#F56C4E")
	.style("stroke", "#222")
	.on('click', function(d) {
       d.click ++;
       if ((d.click)%2 == 0 ) { d3.select(this).style("fill","#F56C4E"); }
	   if ((d.click)%2 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
    });