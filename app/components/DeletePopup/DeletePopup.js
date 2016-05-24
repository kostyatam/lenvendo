var Backbone = require('backbone');
var dispatcher = require('dispatcher');

require('./DeletePopup.styl');

var DeletePopup = module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'panel',
    template: require('./DeletePopup.ejs'),
    events: {
        'click #delete': 'remove',
        'click #cancel': 'cancel'
    },
    initialize: function () {
        this.listenTo(dispatcher, 'delete-popup:open', this.show);
        this.listenTo(dispatcher, 'delete-popup:close', this.hide);
    },
    render: function () {
        var html = this.template();
        this.$el.html(html).hide();
        return this;
    },
    show: function (params) {
        var id = params.id;
        this.collection = params.collection;
        this.block = this.collection.getByBlockId(id);
        this.$el.show();
    },
    hide: function () {
        this.$el.hide();
        this.collection = undefined;
        this.block = undefined;
    },
    remove: function () {
        this.collection.remove(this.block);
        this.hide();
    },
    cancel: function () {
        this.hide();
    }
});