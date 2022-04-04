function gridData() {
	let data = new Array();
	let xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	let ypos = 1;
	let width = 20;
	let height = 20;
	let click = 0;

	// iterate for rows	
	for (let row = 0; row < 20; row++) {
		data.push(new Array());

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
	.attr("width", "510px")
	.attr("height", "510px");

let row = grid.selectAll(".row")
	.data(mygrid)
	.enter().append("g")
	.attr("class", "row");

let column = row.selectAll(".square")
	.data(function (d) { return d; })
	.enter().append("rect")
	.attr("class", "square")
	.attr("x", function (d) { return d.x; })
	.attr("y", function (d) { return d.y; })
	.attr("width", function (d) { return d.width; })
	.attr("height", function (d) { return d.height; })
	.style("fill", "#ffc299")
	.style("stroke", "#222")
	.on('click', function (d) {
		d.click++;
		if ((d.click) % 2 == 0) { d3.select(this).style("fill", "#ffc299"); } // color for C
		if ((d.click) % 2 == 1) { d3.select(this).style("fill", "#8080ff"); } // color for D
		d.click = (d.click) % 2;
	});

var gameMatrix = new Array();
gameMatrix.push(new Array(2));
gameMatrix.push(new Array(2));
var playAnime = false;

let resetButton = d3.select("#resetbutton")
	.on('click', function () {
		for (let row = 0; row < 20; row++) {
			for (let col = 0; col < 20; col++) {
				mygrid[row][col].click = 0;
			}
		}
		playAnime = false;
		row.selectAll(".square").style("fill", "#ffc299");
	});

var iter = 0;

function animeLoop() {
	if (!playAnime) {
		return;
	}
	setTimeout(
		function () {
			let newData = new Array();
			for (let i = 0; i < 20; i++) {
				newData.push(new Array(20));
			}
			console.log("iteration ", iter);
			iter++;
			for (let row = 0; row < 20; row++) {
				for (let col = 0; col < 20; col++) {
					let arr = new Array(8).fill(-1);
					// the neighboring 8 cells;
					if (row > 0) {
						arr[0] = mygrid[row - 1][col].click;
					}
					if (row < 19) {
						arr[1] = mygrid[row + 1][col].click;
					}
					if (col > 0) {
						arr[2] = mygrid[row][col - 1].click;
					}
					if (col < 19) {
						arr[3] = mygrid[row][col + 1].click;
					}
					if (row > 0 && col > 0) {
						arr[4] = mygrid[row - 1][col - 1].click;
					}
					if (row > 0 && col < 19) {
						arr[5] = mygrid[row - 1][col + 1].click;
					}
					if (row < 19 && col < 19) {
						arr[6] = mygrid[row + 1][col + 1].click;
					}
					if (row < 19 && col > 0) {
						arr[7] = mygrid[row + 1][col - 1].click;
					}
					// select the strategy
					let summing_0 = gameMatrix[0][0];
					let summing_1 = gameMatrix[1][1];
					for (let i = 0; i < 8; i++) {
						if (arr[i] != -1) {
							summing_0 = summing_0 + gameMatrix[0][arr[i]];
						}
					}
					for (let i = 0; i < 8; i++) {
						if (arr[i] != -1) {
							summing_1 = summing_1 + gameMatrix[1][arr[i]];
						}
					}
					if (row % 10 == 0 && col % 10 == 0) {
						console.log(summing_0);
						console.log(summing_1);
					}
					if (summing_0 > summing_1) {
						newData[row][col] = 0;
						// column._groups[row][col].style.fill = "#8080ff";
					} else if (summing_1 > summing_0) {
						newData[row][col] = 1;
						// column._groups[row][col].style.fill = "#ffc299"
					} else {
						newData[row][col] = mygrid[row][col].click;
					}
				}
			}
			for (let row = 0; row < 20; row++) {
				for (let col = 0; col < 20; col++) {
					mygrid[row][col].click = newData[row][col];
					if (mygrid[row][col].click == 1) {
						column._groups[row][col].style.fill = "#8080ff";
					} else {
						column._groups[row][col].style.fill = "#ffc299"
					}
				}
			}
			if (iter < 5) {
				animeLoop();
			}
		}, 1000
	);
}

let playButton = d3.select("#play-pause")
	.on('click', function () {
		gameMatrix[0][0] = parseFloat(document.getElementById("cSurroundedByC").innerText);
		gameMatrix[0][1] = parseFloat(document.getElementById("cSurroundedByD").innerText);
		gameMatrix[1][0] = parseFloat(document.getElementById("dSurroundedByC").innerText);
		gameMatrix[1][1] = parseFloat(document.getElementById("dSurroundedByD").innerText);
		iter = 0;
		playAnime = !playAnime;
		// console.log(gameMatrix);
		// debugger;
		animeLoop();
	}
	);