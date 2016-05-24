var Backbone = require('backbone');
var BlockItem = require('../BlockItem/BlockItem');
var dispatcher = require('dispatcher');

require('./BlocksList.styl');

var BlockList = module.exports = Backbone.View.extend({
    tagName: 'ul',
    className: 'blocks-list',
    events: {
        'click .block': 'onBlockClick',
        'click .block__close': 'onBlockClose'
    },
    initialize: function () {
        this.listenTo(this.collection, 'add', this.renderBlock);
    },
    render: function () {
        this.renderAll();
        return this;
    },
    renderBlock: function (block) {
        var view = new BlockItem({model: block});
        this.$el.append(view.render().el);
    },
    renderAll: function () {
        this.collection.forEach(this.renderBlock, this);
    },
    onBlockClick: function (e) {
        var $el = $(e.currentTarget);
        var id = $el.data('id');
        var block = this.getByBlockId(id);
        var clicksCounter = this.clicksCounter;
        if (block.isSimple()) {
            block.toggleSelect();
            return;
        }

        clicksCounter[id] = clicksCounter[id] || {clicks: 0};
        clicksCounter[id].clicks++;

        if (clicksCounter[id].clicks === 1) {
            clicksCounter[id].timer = setTimeout(function () {
                block.toggleSelect()
                clearTimeout(clicksCounter[id].timer);
                clicksCounter[id] = undefined;
            }, 200);
            return;
        }

        block.changeState();
        clearTimeout(clicksCounter[id].timer);
        clicksCounter[id] = undefined;
    },
    clicksCounter: {},
    onBlockClose: function (e) {
        e.stopPropagation();
        var $target = $(e.currentTarget);
        var $el = $target.closest('.block');
        var id = $el.data('id');
        var block = this.getByBlockId(id);
        if (block.isSimple()) {
            this.collection.remove(block);
            return;
        }
        dispatcher.trigger('delete-popup:open', {
            collection: this.collection,
            id: id,
            block: block
        });
    },
    getByBlockId: function (id) {
        return this.collection.getByBlockId(id);
    }
});