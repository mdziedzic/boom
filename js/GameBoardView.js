/* global Tile */

var BOOM = BOOM || {};

'use strict';

$(document).ready(function () {

    BOOM.GameBoardView = function (hTiles, vTiles) {
        this.hTiles = hTiles;
        this.vTiles = vTiles;
        this.tileSize = 25;
        this.gameBoard;
        this.gameBoardWidth = this.hTiles * this.tileSize;
        this.gameBoardContainer = $('#gameboardcontainer');
    };

    BOOM.GameBoardView.prototype = {

        constructor: BOOM.GameBoardView,

        createGameBoard: function() {
            this.gameBoard = $('<div>');
            this.gameBoard.attr('id', 'gameboard');
            this.gameBoard.width(this.hTiles * this.tileSize);
            for (var i = 0; i < this.hTiles; i++) {
                for (var j = 0; j < this.vTiles; j++) {
                    var tile = $('<div>').attr({
                        id: i + '-' + j,
                        class: 'tile'
                    }).css('width', this.tileSize).css('height', this.tileSize);
                    tile.hover(
                        function () {
                            $(this).fadeTo(250, 0.5);
                        },
                        function () {
                            $(this).fadeTo(250, 1);
                        }
                    ).click(
                        function () {
                            BOOM.gbController.saySomething();
                        }
                    );
                    this.gameBoard.append(tile);
                }
            }
            this.gameBoardContainer.width(this.gameBoardWidth);
            this.gameBoardContainer.css('marginLeft', -this.gameBoardWidth / 2);
            this.gameBoardContainer.append(this.gameBoard);
            this.gameBoardContainer.fadeIn(250);
        },

        drawGameBoard: function () {

            for (var i = 0; i < this.height; i++) {
                for (var j = 0; j < this.width; j++) {
                    if (this.tileArray[i][j].flag) {
                        this.drawTile(i, j, this.TileType.FLAG);
                    } else {
                        if (this.tileArray[i][j].uncovered) {
                            this.drawTile(i, j, this.tileArray[i][j].tileType);
                        } else {
                            this.drawTile(i, j, this.TileType.COVERED);
                        }
                    }
                }
            }
        },

        drawTile: function (x, y, typeOfTile) {

        }

    };

});

