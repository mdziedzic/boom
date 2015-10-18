var BOOM = BOOM || {};

$(document).ready(function () {

    'use strict';

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
            launchBoom($(this).index());
        }
    );

BOOM.gbMVC = function () {
    var gbModel = new BOOM.GameBoardModel;
    var gbView = new BOOM.GameBoardView();
    var gbController = new BOOM.GameBoardController();
};




    function launchBoom(difficulty) {

        var numberOfTiles = [10, 20, 50, 100],
            tileSize = 25,
            gameBoard,
            gameBoardWidth = numberOfTiles[difficulty] * tileSize,
            gameBoardContainer = $('#gameboardcontainer');

        // $('header').fadeTo(250, 0.5);

        gameBoard = createGameBoard(numberOfTiles[difficulty], tileSize);
        gameBoard.attr('id', 'gameboard');
        gameBoardContainer.width(gameBoardWidth);
        gameBoardContainer.css('marginLeft', -gameBoardWidth / 2);
        gameBoardContainer.append(gameBoard);
        gameBoardContainer.fadeIn(250);

    }

    function createGameBoard(numberOfTiles, tileSize) {
        var gameBoard = $('<div>');
        gameBoard.width(numberOfTiles * tileSize);
        for (var i = 0; i < numberOfTiles; i++) {
            for (var j = 0; j < numberOfTiles; j++) {
                var tile = $('<div>').attr({
                    id: i + '-' + j,
                    class: 'tile'
                }).css('width', tileSize).css('height', tileSize);
                tile.hover(
                    function () {
                        $(this).fadeTo(250, 0.5);
                    },
                    function () {
                        $(this).fadeTo(250, 1);
                    }
                );
                gameBoard.append(tile);
            }
        }
        return gameBoard;
    }


});
