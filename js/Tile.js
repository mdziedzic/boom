
var BOOM = BOOM || {};

BOOM.Tile = function(tileType) {
    this.tileType = tileType;
    this.uncovered = false;
    this.flag = false;
};

BOOM.Tile.prototype = {

    constructor: BOOM.Tile,

    uncover: function () {
        this.uncovered = true;
    },

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
