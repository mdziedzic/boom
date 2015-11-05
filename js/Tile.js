/*

BOOM
Tile.js

Michael Dziedzic
mdz@eggfoo.com
@michaeldziedzic
www.eggfoo.com

(c)2015

*/

'use strict';

var BOOM = BOOM || {};

BOOM.Tile = function Tile(tileType) {
  this.tileType = tileType;
  this.covered = true;
  this.flag = false;
};
