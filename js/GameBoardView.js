/* global Tile */

var BOOM = BOOM || {};

BOOM.GameBoardView = function () {

};

BOOM.GameBoardView.prototype = {

	constructor: BOOM.GameBoardView,

	drawGameBoard: function () {

		for (var i = 0; i < this.height; i++) {
			for (var j = 0; j < this.width; j++) {
				if (this.tileArray[i][j].flag) {
					this.drawTile(i, j, this.TileType.FLAG);
				} else {
					if (this.tileArray[i][j].uncovered) {
						this.drawTile(i, j, this.tileArray[i][j].tileType);
					} else {
						this.drawTile(i, j, this.TileType.COVERED);
					}
				}
			}
		}
	},

	drawTile: function (x, y, typeOfTile) {

	}




};
