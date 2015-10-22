/* global BOOM.Tile */

var BOOM = BOOM || {};

BOOM.GameBoardModel = function (hTiles, vTiles, bombPercent) {
    this.hTiles = hTiles;
    this.vTiles = vTiles;
    this.bombPercent = bombPercent;

    this.tileArray = [];
    this.numberOfBombs = 0;
    this.correctlyMarkedBombs = 0;

    this.TileType = {
        BLANK: 0, ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, SIX: 6,
        SEVEN: 7, EIGHT: 8, BOMB: 9, COVERED: 10, FLAG: 11, SAFE: 12
    };
};

BOOM.GameBoardModel.prototype = {

    constructor: BOOM.GameBoardModel,

    createGameBoard: function () {
        var vTilesTemp = this.vTiles + 2,
            hTilesTemp = this.hTiles + 2,
            tileArrayTemp = [],
            i, j, k, l;

        // create empty 2-dimensional tileArray and tileArrayTemp
        for (i = 0; i < this.vTiles; i++) {
            this.tileArray[i] = new Array(this.hTiles);
        }
        for (i = 0; i < vTilesTemp; i++) {
            tileArrayTemp[i] = new Array(hTilesTemp);
        }

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

        for (i = 0; i < this.vTiles; i++) {
            for (j = 0; j < this.hTiles; j++) {
                this.tileArray[i][j] = tileArrayTemp[i + 1][j + 1];
            }
        }
        console.log(this.tileArray);
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
                    console.log('game over!!! you win!!!');
                }
            }
        }
        BOOM.gbView.toggleFlag(vPos, hPos);
        console.log(this.correctlyMarkedBombs + '/' + this.numberOfBombs);
    },

    uncoverTile: function (vPos, hPos) {
        var tile = this.tileArray[vPos][hPos];
        tile.covered = false;
        BOOM.gbView.uncoverTile(vPos, hPos);
        if (tile.tileType === this.TileType.BOMB) {
            this.gameOver();
        } else if (tile.tileType === this.TileType.BLANK) {
            tile.tileType = this.TileType.SAFE;
            this.uncoverSafeZone(vPos, hPos);
        }
    },

    gameOver: function () {
        console.log('you loose, bitches kABOOM');
    },

    uncoverSafeZone: function (vPos, hPos) {
        hPos = Number(hPos);
        vPos = Number(vPos);
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                if (((vPos + i) >= 0) && ((vPos + i) < this.vTiles) &&
                    ((hPos + j) >= 0) && ((hPos + j) < this.hTiles)) {
                    var tile = this.tileArray[vPos + i][hPos + j];
                    // this.uncoverTile(vPos + i, hPos + j);
console.log(vPos + i, hPos + j);
                    tile.covered = false;
                    BOOM.gbView.uncoverTile(vPos + i, hPos + j);
                    if (tile.tileType === this.TileType.BLANK) {
                        tile.tileType = this.TileType.SAFE;
                        this.uncoverSafeZone(vPos + i, hPos + j);
                    }
                }
            }
        }
    }
};



















