/*

BOOM
main.js

Michael Dziedzic
mdz@eggfoo.com
@michaeldziedzic
www.eggfoo.com

(c)2015

*/

'use strict';

var BOOM = BOOM || {};

$(document).ready(function () {
  var $difficulty = $('ul li a');

  $('body').fadeIn(750);
  $difficulty.fadeTo(250, 0.5);

  $difficulty.hover(
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
      BOOM.gbMVC($(this).parent().parent().index());
    }
  );
});

// BOOM.config is located in config.js.
BOOM.gbMVC = function gbMVC(difficulty) {
  BOOM.gbModel = new BOOM.GameBoardModel(
    BOOM.config.numberOfHTiles[difficulty],
    BOOM.config.numberOfVTiles[difficulty],
    BOOM.config.bombPercent[difficulty]);
  BOOM.gbView = new BOOM.GameBoardView(
    BOOM.config.numberOfHTiles[difficulty],
    BOOM.config.numberOfVTiles[difficulty],
    BOOM.config.tileSize[difficulty],
    BOOM.config.animSpeed[difficulty]);
  BOOM.gbController = new BOOM.GameBoardController();

  BOOM.gbModel.createGameBoard();
  BOOM.gbView.createGameBoard();
};
