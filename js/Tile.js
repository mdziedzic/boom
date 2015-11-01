'use strict';

var BOOM = BOOM || {};

BOOM.Tile = function(tileType) {
    this.tileType = tileType;
    this.covered = true;
    this.flag = false;
};

BOOM.Tile.prototype = {

    constructor: BOOM.Tile,

    flag: function () {
        this.flag = true;
    },

    unflag: function () {
        this.flag = false;
    },

    hasFlag: function () {
        return this.flag;
    }
};
