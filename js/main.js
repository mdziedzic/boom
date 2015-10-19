var BOOM = BOOM || {};

'use strict';

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

		var numberOfTiles = [10, 20, 50, 100],
			bombPercent = [5, 10, 20, 30];

			BOOM.gbModel = new BOOM.GameBoardModel(numberOfTiles[difficulty], numberOfTiles[difficulty], bombPercent[difficulty]),
			BOOM.gbView = new BOOM.GameBoardView(numberOfTiles[difficulty], numberOfTiles[difficulty]),
			BOOM.gbController = new BOOM.GameBoardController();
	};

});
