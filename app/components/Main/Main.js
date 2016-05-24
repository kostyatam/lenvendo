var Backbone = require('backbone');
var blocks = require('generateBlocks')(1000);
var components = require('components');
var blocksList = new components.BlocksList({collection: blocks});
var panel = new components.Panel({collection: blocks});
var deletePopup = new components.DeletePopup;

require('./Main.styl');

var Main = module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'main',
    render: function () {
        this.$el
            .append(panel.render().el)
            .append(blocksList.render().el)
            .append(deletePopup.render().el);
        return this;
    }
});