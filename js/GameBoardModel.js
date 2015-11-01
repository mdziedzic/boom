'use strict';

/* global BOOM.Tile */

var BOOM = BOOM || {};

BOOM.GameBoardModel = function (hTiles, vTiles, bombPercent, animSpeed) {
    this.hTiles = hTiles;
    this.vTiles = vTiles;
    this.bombPercent = bombPercent;
    this.animSpeed = animSpeed;

    this.tileArray = [];
    this.numberOfBombs = 0;
    this.correctlyMarkedBombs = 0;
    this.animTimer;

    this.TileType = {
        BLANK: 0, ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, SIX: 6,
        SEVEN: 7, EIGHT: 8, BOMB: 9, COVERED: 10, FLAG: 11, SAFE: 12
    };
};

BOOM.GameBoardModel.prototype = {

    constructor: BOOM.GameBoardModel,

    createGameBoard: function () {
        var vTilesTemp = this.vTiles + 2;
        var hTilesTemp = this.hTiles + 2;
        var tileArrayTemp = [];
        var i, j, k, l;

        // create empty 2-dimensional tileArray and tileArrayTemp
        for (i = 0; i < this.vTiles; i++) {
            this.tileArray[i] = new Array(this.hTiles);
        }
        for (i = 0; i < vTilesTemp; i++) {
            tileArrayTemp[i] = new Array(hTilesTemp);
        }

        // populate tileArrayTemp with bombs and blanks
        for (i = 0; i < vTilesTemp; i++) {
            for (j = 0; j < hTilesTemp; j++) {
                if (i === 0 || i === vTilesTemp - 1 || j === 0 || j === hTilesTemp - 1) {
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
        // number of surrounding bombs, if needed
        for (i = 1; i < vTilesTemp - 1; i++) {
            for (j = 1; j < hTilesTemp - 1; j++) {
                var numberOfAdjacentBombs = 0;
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

        // copy tileArrayTemp to tileArray minus the outside columns and rows
        for (i = 0; i < this.vTiles; i++) {
            for (j = 0; j < this.hTiles; j++) {
                this.tileArray[i][j] = tileArrayTemp[i + 1][j + 1];
            }
        }
    },

    toggleFlag: function (vPos, hPos) {
        var tile = this.tileArray[vPos][hPos];
        if (tile.flag) {
            tile.flag = false;
            if (tile.tileType === this.TileType.BOMB) {
                this.correctlyMarkedBombs--;
            }
        } else {
            tile.flag = true;
            if (tile.tileType === this.TileType.BOMB) {
                this.correctlyMarkedBombs++;
                if (this.correctlyMarkedBombs === this.numberOfBombs) {
                    this.gameOver(true);
                }
            }
        }
        BOOM.gbView.toggleFlag(vPos, hPos);
    },

    uncoverTile: function (vPos, hPos) {
        var tile = this.tileArray[vPos][hPos];
        tile.covered = false;
        BOOM.gbView.uncoverTile(vPos, hPos);
        if (tile.tileType === this.TileType.BOMB) {
            this.gameOver(false);
        } else if (tile.tileType === this.TileType.BLANK) {
            tile.tileType = this.TileType.SAFE;
            this.animTimer = 0;
            this.uncoverSafeZone(vPos, hPos);
        }
    },

    gameOver: function (won) {
        if (won) {
            console.log('game over!!! you win!!!')
        } else {
            BOOM.gbView.gameOverLose();
        }
    },

    // recursive function that reveals adjacent blank tiles
    uncoverSafeZone: function (vPos, hPos) {
        hPos = Number(hPos);
        vPos = Number(vPos);
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                if (vPos + i >= 0 && vPos + i < this.vTiles &&
                    hPos + j >= 0 && hPos + j < this.hTiles) {
                    var tile = this.tileArray[vPos + i][hPos + j];
                    var that = this;

                    // need to create closure with self-invoking
                    // function in order to ensure that
                    // each call of gbView.uncoverTile() gets its own
                    // copy of i and j
                    var x = function (y, x) {
                        // stagger calls to gvView.uncoverTile() by
                        // animSpeed to create cascading animation
                        // effect when revealing tiles
                        setTimeout(function () {
                            tile.covered = false;
                            BOOM.gbView.uncoverTile(y, x);
                        }, that.animTimer += that.animSpeed);
                    }(vPos + i, hPos + j);

                    // before recursing on a tile, set tileType to SAFE
                    // in order to prevent
                    // multiple recurssive calls to the same tile
                    if (tile.tileType === this.TileType.BLANK) {
                        tile.tileType = this.TileType.SAFE;
                        this.uncoverSafeZone(vPos + i, hPos + j);
                    }
                }
            }
        }
    }
};



















