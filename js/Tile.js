

function Tile(tileType) {
	this.uncovered = false;
	this.flag = false;
	this.tileType = tileType;
}

Tile.prototype = {
	constructor: Tile
};
