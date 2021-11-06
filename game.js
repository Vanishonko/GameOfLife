let updates=0;

const sizeX = 30, sizeY = 30, dC = "black", aC = "yellow";
let grid = [], automoving = false, chanceOfAlive = 0.2, glowies = [];

reset();

function reset(){
	if(document.getElementById("chance").value >= 0 && document.getElementById("chance").value <= 100){
		chanceOfAlive = document.getElementById("chance").value / 100;
	}
	for(let x = 0 ; x < sizeX ; ++ x){
		grid[x] = [];
		glowies[x] = [];
		for(let y = 0 ; y < sizeY ; ++ y){
			grid[x][y] = false;
			if(Math.random() <= chanceOfAlive) grid[x][y] = true;
		}	
	}
}

function nextGen(){
	for(let x = 0 ; x < sizeX ; ++ x){
		for(let y = 0 ; y < sizeY ; ++ y){
			glowies[x][y] = countNeighbours(x, y);
		}
	}
	for(let x = 0 ; x < sizeX ; ++ x){
		for(let y = 0 ; y < sizeY ; ++ y){
			if(glowies[x][y] == 3 && !grid[x][y]) grid[x][y] = true;
			if(glowies[x][y] > 3 && grid[x][y]) grid[x][y] = false;
			if(glowies[x][y] < 2 && grid[x][y]) grid[x][y] = false;
		}
	}
}

function countNeighbours(x, y){
	let n = 0;
	// x - 1, y
	// x + 1, y
	// x, y - 1
	// x, y + 1
	// x - 1, y - 1
	// x + 1, y - 1
	// x - 1, y + 1
	// x + 1, y + 1
	try{ if(grid[x-1][y]) n++; } catch {}
	try{ if(grid[x+1][y]) n++; } catch {}
	try{ if(grid[x][y-1]) n++; } catch {}
	try{ if(grid[x][y+1]) n++; } catch {}
	try{ if(grid[x-1][y-1]) n++; } catch {}
	try{ if(grid[x-1][y+1]) n++; } catch {}
	try{ if(grid[x+1][y+1]) n++; } catch {}
	try{ if(grid[x+1][y-1]) n++; } catch {}
	return n;
}

grid.draw = function(){
	for(let x = 0; x < sizeX ; ++ x){
		for(let y = 0 ; y < sizeY ; ++ y){
			context.fillStyle = dC;
			if(grid[x][y]) context.fillStyle = aC;
			context.fillRect(canvas.height / sizeX * x, canvas.height / sizeY * y, canvas.height/sizeX-2, canvas.height/sizeY-2);
		}
	}
}

let counter = 0, counterMax = 10;
function update() {
	if(automoving){
		counter++;
		if(counter >= counterMax){
			nextGen();
			counter = 0;
		}
	}
}

function draw() {
	grid.draw()
}

function keyup(key) {

	//console.log("Pressed", key);
}

function mouseup() {
	mouse.isPressed = false;
	let x_ = Math.floor ( mouse.x / (canvas.height / sizeX) );
	let y_ = Math.floor ( mouse.y / (canvas.height / sizeY) );
	if( (x_ >= 0 && x_ < sizeX) && (y_ >= 0 && y_ < sizeY)){
		grid[x_][y_] = !grid[x_][y_];
	}
	// console.log("Mouse clicked at", mouse.x, mouse.y);
}

function mousedown(){
	mouse.isPressed = true;

}
