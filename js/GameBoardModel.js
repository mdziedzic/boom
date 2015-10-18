/* global Tile */

var BOOM = BOOM || {};

BOOM.GameBoardModel = function (width, height, bombPercent) {
    this.width = width;
    this.height = height;
    this.bombPercent = bombPercent;

    var tileArray,
    numberOfBombs,
    correctlyMarkedBombs;
};

BOOM.GameBoardModel.prototype = {

    constructor: BOOM.GameBoardModel,

    TileType: {
        BLANK: 0, ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, SIX: 6,
        SEVEN: 7, EIGHT: 8, BOMB: 9, COVERED: 10, FLAG: 11, SAFE: 12
    },

    populateGameBoard: function () {
        var tempHeight = this.height + 2,
        tempWidth = this.width + 2,
        tempTileArray = [],
        i, j, k, l;

        // create empty 2-dimensional tileArray and tempTileArray
        for (i = 0; i < this.width; i++) {
            this.tileArray[i] = new Array(this.height);
        }
        for (i = 0; i < tempWidth; i++) {
            tempTileArray[i] = new Array(tempHeight);
        }

        for (i = 0; i < tempHeight; i++) {
            for (j = 0; j < tempWidth; j++) {
                if (i === 0 || i === tempHeight - 1 || j === 0 || j === tempWidth - 1) {
                    tempTileArray[i][j] = new Tile(this.TileType.BLANK);
                } else {
                    if (Math.random() * 100 < this.bombPercent) {
                        tempTileArray[i][j] = new Tile(this.TileType.BOMB);
                        this.numberOfBombs++;
                    } else {
                        tempTileArray[i][j] = new Tile(this.TileType.BOMB);
                    }
                }
            }
        }

        for (i = 0; i < tempHeight - 1; i++) {
            for (j = 0; j < tempWidth - 1; j++) {
                var numberOfAdjacentBombs = 0;
                if (tempTileArray[i][j].tileType !== this.TileType.BOMB) {
                    for (k = -1; k < 2; k++) {
                        for (l = -1; l < 2; l++) {
                            if (tempTileArray[i + k][j + l].tileType === this.TileType.BOMB) {
                                numberOfAdjacentBombs++;
                            }
                        }
                    }
                    tempTileArray[i][j].tileType = numberOfAdjacentBombs;
                }
            }
        }

        for (i = 0; i < this.height; i++) {
            for (j = 0; j < this.width; j++) {
                this.tileArray[i][j] = tempTileArray[i + 1][j + 1];
            }
        }
    },

    uncoverTile: function () {

    },

    uncoverAllTiles: function () {

    },

    revealSafetyZone: function () {

    }
};
