'use strict';

/* global Tile */

var BOOM = BOOM || {};

BOOM.GameBoardController = function () {};

BOOM.GameBoardController.prototype = {

	constructor: BOOM.GameBoardController,

	// handleTileClick() is called by a click event handler that is
	// attached to the individual on-screen tiles as they are created
	// in gbView.createGameBoard()
	handleTileClick: function (event) {
		var vPos = event.target.dataset.vpos;
		var hPos = event.target.dataset.hpos;

		if (BOOM.gbModel.tileArray[vPos][hPos].covered) {
			if (event.shiftKey) {
				BOOM.gbModel.toggleFlag(vPos, hPos);
			} else {
				if (!BOOM.gbModel.tileArray[vPos][hPos].flag) {
					BOOM.gbModel.uncoverTile(vPos, hPos);
				}
			}
		}
	}
};
