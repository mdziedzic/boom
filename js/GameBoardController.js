/* global Tile */

var BOOM = BOOM || {};

'use strict';

BOOM.GameBoardController = function () {

	BOOM.gbModel.createGameBoard();
	BOOM.gbView.createGameBoard();

};

BOOM.GameBoardController.prototype = {

	constructor: BOOM.GameBoardController,

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
