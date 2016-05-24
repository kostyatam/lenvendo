'use strict';
var Block = require('models').Block;
var Blocks = require('collections').Blocks;

module.exports = function (n) {
    var collection = new Blocks;
    for (; n > 0; n--) {
        collection.add(new Block);
    }
    return collection
}