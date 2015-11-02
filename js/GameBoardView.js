'use strict';

/* global Tile */

var BOOM = BOOM || {};

$(document).ready(function () {

    BOOM.GameBoardView = function (hTiles, vTiles, tileSize) {
        this.hTiles = hTiles;
        this.vTiles = vTiles;
        this.tileSize = tileSize;
        this.gameBoard;
        this.gameBoardWidth = this.hTiles * this.tileSize;
        this.gameBoardContainer = $('#gameboardcontainer');
        this.gameBoardShaker = $('#gameboardshaker');
    };

    BOOM.GameBoardView.prototype = {

        constructor: BOOM.GameBoardView,

        createGameBoard: function() {
            this.gameBoard = $('<div>')
                .attr('id', 'gameboard')
                .width(this.hTiles * this.tileSize);
            for (var i = 0; i < this.vTiles; i++) {
                for (var j = 0; j < this.hTiles; j++) {
                    var tile = $('<div>').attr({
                        class: 'tile tile-covered',
                        'data-vPos': i,
                        'data-hPos': j
                    }).css('width', this.tileSize).css('height', this.tileSize);

                    tile.hover(
                        function () {
                            $(this).fadeTo(250, 0.5);
                        },
                        function () {
                            $(this).fadeTo(250, 1);
                        }
                    ).click(
                        function (event) {
                            BOOM.gbController.handleTileClick(event);
                        }
                    );

                    this.gameBoard.append(tile);
                }
            }
            this.gameBoardContainer.width(this.gameBoardWidth)
                .css('marginLeft', -this.gameBoardWidth / 2)
                .append(this.gameBoard)
                .fadeIn(250);
        },

        toggleFlag: function (vPos, hPos) {
            var tile = this.locateTile(vPos, hPos);
            if (tile.hasClass('tile-flagged')) {
                tile.removeClass('tile-flagged')
                    .addClass('tile-covered')
                    .hover(
                        function () {
                            $(this).fadeTo(250, 0.5);
                        },
                        function () {
                            $(this).fadeTo(250, 1);
                        });
            } else {
                tile.removeClass('tile-covered')
                    .addClass('tile-flagged')
                    .unbind('mouseenter mouseleave')
                    .fadeTo(250, 1);
            }
        },

        uncoverTile: function (vPos, hPos) {
            var tile = this.locateTile(vPos, hPos);
            var tileType = BOOM.gbModel.tileArray[vPos][hPos].tileType;
            var tileClassName = 'tile-' + tileType;
            var tileText = tileType === 9 ? '¤' : tileType;
            if (tileText === 0 || tileText === 12) {
                tileText = '';
            }
            tile.removeClass('tile-covered')
                .html('<p>' + tileText + '</p>')
                .fadeTo(250, 1)
                .addClass('tile-uncovered')
                .addClass(tileClassName)
                .unbind();
        },

        // finds position of tile in 1-dimenstional dom gameboard array
        // from its location in the model's 2-dimensional array
        locateTile: function (vPos, hPos) {
            var index = Number(vPos) * this.hTiles + Number(hPos);
            return this.gameBoard.children().eq(index);
        },

        gameOverLose: function () {
            this.gameBoardShaker.addClass('game-over-lose');
            setTimeout(function () {
                $('body').fadeOut(750, function () {
                    location.reload();
                });
            }, 5000);
        }

    };

});

