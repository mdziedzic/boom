

function Tile(tileType) {
	var tileType,
		uncovered = false,
		flag = false;

	this.tileType = tileType;
}

Tile.prototype = {
	constructor: Tile,
	uncoverTile = function () {
		this.uncovered = true;
	},
	isUncovered = function () {
		return this.uncovered;
	},
	flagTile = function () {
		this.flag = true;
	},
	unFlagTile = function () {
		this.flag = false;
	},
	hasFlag = function () {
		return this.flag;
	}
};
