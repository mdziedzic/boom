/* global BOOM.Tile */

/*

BOOM
GameBoardController.js

Michael Dziedzic
mdz@eggfoo.com
@michaeldziedzic
www.eggfoo.com

(c)2015

*/

'use strict';

var BOOM = BOOM || {};

BOOM.GameBoardController = function GameBoardController() {};

// handleTileClick() is called by a click event handler that is
// attached to the individual on-screen tiles as they are created
// in BOOM.gbView.createGameBoard().
BOOM.GameBoardController.prototype.handleTileClick
    = function handleTileClick(event) {

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
};
