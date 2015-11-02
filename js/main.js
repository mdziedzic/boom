'use strict';

var BOOM = BOOM || {};

$(document).ready(function () {

	$('body').fadeIn(750);

	$('ul li').hover(
		function () {
			$(this).fadeTo(250, 1);
		},
		function () {
			$(this).fadeTo(250, 0.5);
		}
	).click(
		function () {
			event.preventDefault();
			$('ul, p').hide();
			$('header').fadeTo(250, 0.75);
			BOOM.gbMVC($(this).index());
		}
	);
});

// BOOM.config is located in config.js
BOOM.gbMVC = function (difficulty) {
	BOOM.gbModel = new BOOM.GameBoardModel(
		BOOM.config.numberOfHTiles[difficulty],
		BOOM.config.numberOfVTiles[difficulty],
		BOOM.config.bombPercent[difficulty],
		BOOM.config.animSpeed[difficulty]);
	BOOM.gbView = new BOOM.GameBoardView(
		BOOM.config.numberOfHTiles[difficulty],
		BOOM.config.numberOfVTiles[difficulty],
		BOOM.config.tileSize[difficulty]);
	BOOM.gbController = new BOOM.GameBoardController();

	BOOM.gbModel.createGameBoard();
	BOOM.gbView.createGameBoard();
};
