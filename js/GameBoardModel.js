/* global BOOM.Tile */

/*

BOOM
GameBoardModel.js

Michael Dziedzic
mdz@eggfoo.com
@michaeldziedzic
www.eggfoo.com

(c)2015

*/

'use strict';

var BOOM = BOOM || {};

BOOM.GameBoardModel
    = function GameBoardModel(hTiles, vTiles, bombPercent) {

  this.hTiles = hTiles;
  this.vTiles = vTiles;
  this.bombPercent = bombPercent;

  this.tileArray = [];
  this.numberOfBombs = 0;
  this.correctlyMarkedBombs = 0;
  this.incorrectlyMarkedBombs = 0;

  this.TileType = {
    BLANK: 0, ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, SIX: 6,
    SEVEN: 7, EIGHT: 8, BOMB: 9, COVERED: 10, FLAG: 11, SAFE: 12
  };
};

BOOM.GameBoardModel.prototype.createGameBoard = function createGameBoard() {
  var vTilesTemp = this.vTiles + 2;
  var hTilesTemp = this.hTiles + 2;
  var tileArrayTemp = [];
  var i, j, k, l;

  // create empty 2-dimensional tileArray and tileArrayTemp.
  for (i = 0; i < this.vTiles; i++) {
    this.tileArray[i] = new Array(this.hTiles);
  }

  for (i = 0; i < vTilesTemp; i++) {
    tileArrayTemp[i] = new Array(hTilesTemp);
  }

  // populate tileArrayTemp with bombs and blanks.
  for (i = 0; i < vTilesTemp; i++) {
    for (j = 0; j < hTilesTemp; j++) {
      if (i === 0
          || i === vTilesTemp - 1
          || j === 0
          || j === hTilesTemp - 1) {

        tileArrayTemp[i][j] = new BOOM.Tile(this.TileType.BLANK);
      } else {
        if (Math.random() * 100 < this.bombPercent) {
          tileArrayTemp[i][j] = new BOOM.Tile(this.TileType.BOMB);
          this.numberOfBombs++;
        } else {
          tileArrayTemp[i][j] = new BOOM.Tile(this.TileType.BLANK);
        }
      }
    }
  }

  // replace blank tileTypes with ones that indicate the
  // number of surrounding bombs, if needed.
  for (i = 1; i < vTilesTemp - 1; i++) {
    for (j = 1; j < hTilesTemp - 1; j++) {
      var numberOfAdjacentBombs = 0;

      // if bomb, count the bombs in the adjacent 8 tiles.
      if (tileArrayTemp[i][j].tileType !== this.TileType.BOMB) {
        for (k = -1; k < 2; k++) {
          for (l = -1; l < 2; l++) {
            if (tileArrayTemp[i + k][j + l].tileType === this.TileType.BOMB) {
              numberOfAdjacentBombs++;
            }
          }
        }

        tileArrayTemp[i][j].tileType = numberOfAdjacentBombs;
      }
    }
  }

  // copy tileArrayTemp to tileArray minus the outside columns and rows.
  for (i = 0; i < this.vTiles; i++) {
    for (j = 0; j < this.hTiles; j++) {
      this.tileArray[i][j] = tileArrayTemp[i + 1][j + 1];
    }
  }
};

BOOM.GameBoardModel.prototype.toggleFlag = function toggleFlag(vPos, hPos) {
  var tile = this.tileArray[vPos][hPos];
  if (tile.flag) {
    tile.flag = false;
    if (tile.tileType === this.TileType.BOMB) {
      this.correctlyMarkedBombs--;
    } else {
      this.incorrectlyMarkedBombs--;
    }
  } else {
    tile.flag = true;
    if (tile.tileType === this.TileType.BOMB) {
      this.correctlyMarkedBombs++;
    } else {
      this.incorrectlyMarkedBombs++;
    }
  }

  BOOM.gbView.toggleFlag(vPos, hPos);

  // game won!
  if (this.correctlyMarkedBombs === this.numberOfBombs
    && this.incorrectlyMarkedBombs === 0) {

    this.gameOver('win');
  }
};

BOOM.GameBoardModel.prototype.uncoverTile = function uncoverTile(vPos, hPos) {
  var tile = this.tileArray[vPos][hPos];
  tile.covered = false;
  BOOM.gbView.uncoverTile(vPos, hPos);

  // game lost!
  if (tile.tileType === this.TileType.BOMB) {
    this.gameOver('lose');
  } else if (tile.tileType === this.TileType.BLANK) {
    tile.tileType = this.TileType.SAFE;
    this.uncoverSafeZone(vPos, hPos);
  }
};

BOOM.GameBoardModel.prototype.gameOver = function gameOver(winOrLose) {
  this.uncoverAllTiles();
  if (winOrLose === 'win') {
    BOOM.gbView.gameOver('win');
  } else {
    BOOM.gbView.gameOver('lose');
  }
};

BOOM.GameBoardModel.prototype.uncoverAllTiles = function uncoverAllTiles() {
  for (var i = 0; i < this.tileArray.length; i++) {
    for (var j = 0; j < this.tileArray[i].length; j++) {
      this.toggleFlag(i, j);
      BOOM.gbView.uncoverTile(i, j);
    }
  }
};

// recursive function that reveals adjacent blank tiles.
BOOM.GameBoardModel.prototype.uncoverSafeZone
    = function uncoverSafeZone(vPos, hPos) {

  hPos = Number(hPos);
  vPos = Number(vPos);
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      if (vPos + i >= 0
          && vPos + i < this.vTiles
          && hPos + j >= 0
          && hPos + j < this.hTiles) {

        var tile = this.tileArray[vPos + i][hPos + j];

        // need to create closure with self-invoking
        // function in order to ensure that
        // each call of BOOM.gbView.uncoverTile() gets its own
        // copy of i and j.
        (function (vPosCl, hPosCl) {
          if (!tile.flag) {
            tile.covered = false;
            BOOM.gbView.uncoverTile(vPosCl, hPosCl);
          }
        }(vPos + i, hPos + j));

        // before recursing on a tile, set tileType to SAFE
        // in order to prevent multiple call to the same tile.
        if (tile.tileType === this.TileType.BLANK
            && !tile.flag) {

          tile.tileType = this.TileType.SAFE;
          this.uncoverSafeZone(vPos + i, hPos + j);
        }
      }
    }
  }
};
