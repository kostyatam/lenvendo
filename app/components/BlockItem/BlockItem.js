var Backbone = require('backbone');

require('./BlockItem.styl');

var BlockItem = module.exports = Backbone.View.extend({
    tagName: 'li',
    className: 'blocks-list__item',
    template: require('./BlockItem.ejs'),
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'remove', this.remove);
    },
    render: function () {
        var model = this.model;
        var simple = model.get('simple');
        var selected = model.get('selected');
        var text = model.get('text');
        var state = model.get('state');
        var stateClass = (simple) ? '' : 'block_state_' + state;
        var selectedClass = (!selected) ? '' : 'block_state_selected';
        var id = model.cid;
        var html = this.template({
            id: id,
            text: this.model.get('text'),
            stateClass: stateClass,
            selectedClass: selectedClass
        });
        this.$el.html(html);

        return this;
    }
});