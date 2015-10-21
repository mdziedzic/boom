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
            var tile = this.locateTile(vPos, hPos),
                tileClassName = 'tile-' + BOOM.gbModel.tileArray[vPos][hPos].tileType,
                tileText = BOOM.gbModel.tileArray[vPos][hPos].tileType === 9 ? '*' : BOOM.gbModel.tileArray[vPos][hPos].tileType;
            tile.unbind()
                .removeClass('tile-covered')
                .addClass(tileClassName)
                .html('<p>' + tileText + '</p>')
                .fadeTo(250, 1);
        },

        locateTile: function (vPos, hPos) {
            var index = Number(vPos) * this.hTiles + Number(hPos);
            return this.gameBoard.children().eq(index);
        },

    };

});

