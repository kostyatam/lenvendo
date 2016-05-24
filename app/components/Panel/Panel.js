var Backbone = require('backbone');

require('./Panel.styl')

var Panel = module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'panel',
    template: require('./Panel.ejs'),
    events: {
        'click #add-block': 'addBlock'
    },
    initialize: function () {
        this.listenTo(this.collection, 'all', this.render);
    },
    render: function () {
        var blockCount = this.collection.length;
        var selectedCount = 0;
        var greenCount = 0;
        var redCount = 0;
        this.collection.forEach(function (block) {
            if (!block.get('selected')) return;
            selectedCount+=1;

            if (block.isSimple()) return;

            var state = block.get('state')
            if (state === 'red') {
                redCount+=1;
            }
            if (state === 'green') {
                greenCount+=1;
            }
        });
        var html = this.template({
            blockCount: blockCount,
            selectedCount: selectedCount,
            greenCount: greenCount,
            redCount: redCount
        });
        this.$el.html(html);
        return this;
    },
    addBlock: function () {
        this.collection.add({});
    }
});