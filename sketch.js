var gridSize = null;
var defaultCell = null; // default cell type: cooperator
function gridData() {
	let data = new Array();
	let xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	let ypos = 1;
	let width = 20;
	let height = 20;
	let gridInput = document.getElementById("gridSize").value;
	if (!gridInput) {
		gridSize = 20;
	}
	if (!defaultCell) {
		defaultCell = 0; // cooperator
	}
	let click = null;
	if (defaultCell == 0) {
		click = 0;
	} else {
		click = 1;
	}

	// iterate for rows	
	for (let row = 0; row < gridSize; row++) {
		data.push(new Array());

		// iterate for cells/columns inside rows
		for (var column = 0; column < gridSize; column++) {
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

var mygrid = null;
var grid = null;
var row = null;
var column = null;

var gameMatrix = new Array();
gameMatrix.push(new Array(2));
gameMatrix.push(new Array(2));
var playAnime = false;

var resetButton = d3.select("#resetbutton")
	.on('click', function () {
		for (let row = 0; row < gridSize; row++) {
			for (let col = 0; col < gridSize; col++) {
				mygrid[row][col].click = 0;
			}
		}
		playAnime = false;
		row.selectAll(".square").style("fill", "#fca973");
	});

var iter = 0;

function animeLoop() {
	if (!playAnime) {
		return;
	}
	setTimeout(
		function () {
			let newData = new Array();
			let payOffData = new Array();
			for (let i = 0; i < gridSize; i++) {
				newData.push(new Array(gridSize));
				payOffData.push(new Array(gridSize).fill(0));
			}
			console.log("iteration ", iter);
			iter++;
			for (let row = 0; row < gridSize; row++) {
				for (let col = 0; col < gridSize; col++) {
					let arr = new Array(8).fill(-1);
					// the neighboring 8 cells;
					if (row > 0) {
						arr[0] = mygrid[row - 1][col].click;
					}
					if (row < (gridSize - 1)) {
						arr[1] = mygrid[row + 1][col].click;
					}
					if (col > 0) {
						arr[2] = mygrid[row][col - 1].click;
					}
					if (col < (gridSize - 1)) {
						arr[3] = mygrid[row][col + 1].click;
					}
					if (row > 0 && col > 0) {
						arr[4] = mygrid[row - 1][col - 1].click;
					}
					if (row > 0 && col < (gridSize - 1)) {
						arr[5] = mygrid[row - 1][col + 1].click;
					}
					if (row < (gridSize - 1) && col < (gridSize - 1)) {
						arr[6] = mygrid[row + 1][col + 1].click;
					}
					if (row < (gridSize - 1) && col > 0) {
						arr[7] = mygrid[row + 1][col - 1].click;
					}
					// calculate the payoff
					for (let i = 0; i < 8; i++) {
						payOffData[row][col] = payOffData[row][col] + gameMatrix[mygrid[row][col].click][arr[i]];
					}
					let summing = arr.reduce((a, b) => a + b);
					if (mygrid[row][col].click == 0 && summing < 8) {
						payOffData[row][col] = payOffData[row][col] + gameMatrix[0][0];
					}
				}
			}
			for (let row = 0; row < gridSize; row++) {
				for (let col = 0; col < gridSize; col++) {
					let arr = new Array(8).fill(null);
					if (row > 0 && col > 0) { arr[0] = payOffData[row - 1][col - 1]; }
					if (row > 0 && col < (gridSize - 1)) { arr[1] = payOffData[row - 1][col + 1]; }
					if (row < (gridSize - 1) && col > 0) { arr[2] = payOffData[row + 1][col - 1]; }
					if (row < (gridSize - 1) && col < (gridSize - 1)) { arr[3] = payOffData[row + 1][col + 1]; }
					if (row > 0) { arr[4] = payOffData[row - 1][col]; }
					if (row < (gridSize - 1)) { arr[5] = payOffData[row + 1][col]; }
					if (col > 0) { arr[6] = payOffData[row][col - 1]; }
					if (col < (gridSize - 1)) { arr[7] = payOffData[row][col + 1]; }
					let maxPos = 0;
					for (let k = 1; k < 8; k++) {
						if (arr[k] > arr[maxPos]) {
							maxPos = k;
						}
					}
					switch (maxPos) {
						case 0:
							newData[row][col] = mygrid[row - 1][col - 1].click;
							break;
						case 1:
							newData[row][col] = mygrid[row - 1][col + 1].click;
							break;
						case 2:
							newData[row][col] = mygrid[row + 1][col - 1].click;
							break;
						case 3:
							newData[row][col] = mygrid[row + 1][col + 1].click;
							break;
						case 4:
							newData[row][col] = mygrid[row - 1][col].click;
							break;
						case 5:
							newData[row][col] = mygrid[row + 1][col].click;
							break;
						case 6:
							newData[row][col] = mygrid[row][col - 1].click; break;
						default: newData[row][col] = mygrid[row][col + 1].click; break;
					}
				}
			}
			for (let row = 0; row < gridSize; row++) {
				for (let col = 0; col < gridSize; col++) {
					if (newData[row][col] == 1 && mygrid[row][col].click != newData[row][col]) {
						column._groups[row][col].style.fill = "#8080ff";
						// new type D
						mygrid[row][col].click = 1;
					}
					else if (newData[row][col] == 1) {
						column._groups[row][col].style.fill = "#cccfff";
					}
					else if (newData[row][col] == 0 && mygrid[row][col].click != newData[row][col]) {
						column._groups[row][col].style.fill = "#fca973";
						// new type C
						mygrid[row][col].click = 0;
					}
					else {
						column._groups[row][col].style.fill = "#fbe1cd"
					}
				}
			}
			if (iter < 10) {
				animeLoop();
			}
		}, 800
	);
}

var playButton = d3.select("#play-pause")
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
	});

var gridButton = d3.select("#resetgrid")
	.on('click', function(){
		grid = null;
		document.getElementById("d3sketch").innerHTMl = "";
		gridSize = parseFloat(document.getElementById("gridSize").value);
		mygrid = gridData();
		grid = d3.select("#d3sketch")
			.append("svg")
			.attr("width", "510px")
			.attr("height", "510px");

		row = grid.selectAll(".row")
			.data(mygrid)
			.enter().append("g")
			.attr("class", "row");

		column = row.selectAll(".square")
			.data(function (d) { return d; })
			.enter().append("rect")
			.attr("class", "square")
			.attr("x", function (d) { return d.x; })
			.attr("y", function (d) { return d.y; })
			.attr("width", function (d) { return d.width; })
			.attr("height", function (d) { return d.height; })
			.style("fill", "#fca973")
			.style("stroke", "#222")
			.on('click', function (d) {
				d.click++;
				if ((d.click) % 2 == 0) { d3.select(this).style("fill", "#fca973"); } // color for C
				if ((d.click) % 2 == 1) { d3.select(this).style("fill", "#8080ff"); } // color for D
				d.click = (d.click) % 2;
			});
	});