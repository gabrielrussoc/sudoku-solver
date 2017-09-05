function new_grid() {
	var grid = new Array(9);
	for(var i = 0; i < 9; i++) 
		grid[i] = new Array(9);
	return grid;
}

function read() {
	var input_grid = new_grid();
	for(var i = 0; i < 9; i++)
		for(var j = 0; j < 9; j++)
			input_grid[i][j] = document.getElementById("cell-" + String(9*i+j));
	return input_grid;
}

function convert(input_grid) {
	var grid = new_grid();
	for(var i = 0; i < 9; i++)
		for(var j = 0; j < 9; j++)
			grid[i][j] = Number(input_grid[i][j].value);
	return grid;
}

function valid(grid, i, j, num) {
	for(var k = 0; k < 9; k++)
		if(grid[i][k] == num || grid[k][j] == num)
			return false;
	var ti = ((i / 3) | 0) * 3;
	var tj = ((j / 3) | 0) * 3;
	for(var ki = ti; ki < ti + 3; ki++)
		for(var kj = tj; kj < tj + 3; kj++)
			if(grid[ki][kj] == num)
				return false;
	return true;
}

function fill(grid, i, j) {
	if(i == 9) return true;
	var nj = (j + 1) % 9;
	var ni = i + (((j + 1) / 9) | 0);
	if(grid[i][j] != 0)
		return fill(grid, ni, nj);
	for(var num = 1; num < 10; num++) {
		if(!valid(grid, i, j, num)) continue;
		grid[i][j] = num;
		if(fill(grid, ni, nj)) return true;
		grid[i][j] = 0;
	}
	return false;
}

function show(grid, input_grid) {
	for(var i = 0; i < 9; i++)
		for(var j = 0; j < 9; j++)
			input_grid[i][j].value = grid[i][j];
}

function fail() {
	document.getElementById("error").classList.remove("is-hidden");
}

function legal(grid) {
	for(var i = 0; i < 9; i++)
		for(var j = 0; j < 9; j++) {
			var num = grid[i][j];
			if(num < 0 || num > 9) return false;
			if(num != 0) {
				grid[i][j] = 0;
				if(!valid(grid, i, j, num))
					return false;
				grid[i][j] = num;
			}
		}
	return true;
}

function solve(input_grid) {
	var grid = convert(input_grid);
	if(legal(grid) && fill(grid, 0, 0))
		show(grid, input_grid);
	else
		fail();
}

function start() {	
	var input_grid = read();
	solve(input_grid);
}

function clear() {
	document.getElementById("error").classList.add("is-hidden");
	for(var i = 0; i < 9; i++)
		for(var j = 0; j < 9; j++)
			document.getElementById("cell-" + String(9*i+j)).value = "";
}

solve_button = document.getElementById("solve");
solve_button.addEventListener("click", start);

clear_button = document.getElementById("clear");
clear_button.addEventListener("click", clear);
