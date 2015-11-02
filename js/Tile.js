'use strict';

var BOOM = BOOM || {};

BOOM.Tile = function(tileType) {
    this.tileType = tileType;
    this.covered = true;
    this.flag = false;
};

BOOM.Tile.prototype = {

    constructor: BOOM.Tile
};
