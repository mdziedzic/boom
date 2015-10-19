/* global Tile */

var BOOM = BOOM || {};

'use strict';

BOOM.GameBoardController = function () {

	BOOM.gbView.createGameBoard();

};

BOOM.GameBoardController.prototype = {

	constructor: BOOM.GameBoardController,

	saySomething: function () {
		console.log('something');
	}



};
