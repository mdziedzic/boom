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
			$('ul').hide();
			$('header').fadeTo(250, 0.75);
			BOOM.gbMVC($(this).index());
		}
	);

	BOOM.gbMVC = function (difficulty) {

		var numberOfTiles = [10, 20, 50, 100];
		var bombPercent = [10, 10, 10, 10];
		var tileSize = [50, 25, 25, 20];
		var animSpeed = [10, 3, 1, 0];

			BOOM.gbModel = new BOOM.GameBoardModel(numberOfTiles[difficulty],
				numberOfTiles[difficulty],
				bombPercent[difficulty],
				animSpeed[difficulty]);
			BOOM.gbView = new BOOM.GameBoardView(numberOfTiles[difficulty],
				numberOfTiles[difficulty],
				tileSize[difficulty]);
			BOOM.gbController = new BOOM.GameBoardController();
	};
});
