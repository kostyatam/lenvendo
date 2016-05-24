var Backbone = require('backbone');
var Block = require('models').Block;

var Blocks = module.exports = Backbone.Collection.extend({
    model: Block,
    getByBlockId: function (id) {
        return this.get(id);
    }
})
