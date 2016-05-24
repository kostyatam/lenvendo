var Backbone = require('backbone');
var states = ['red', 'green'];
var loremIpsum = require('lorem-ipsum');

var Block = module.exports = Backbone.Model.extend({
    defaults: function () {
        return {
            simple: Math.random() > .5,
            text: loremIpsum(),
            selected: false,
            state: (!this.simple) ? states[Math.floor(Math.random() * states.length)] : undefined
        };
    },
    toggleSelect: function () {
        var selected = this.get('selected');
        this.set('selected', !selected);
    },
    changeState: function () {
        var state = this.get('state');
        switch (state) {
            case 'red':
                this.set('state', 'green');
                break;
            case 'green':
                this.set('state', 'red');
                break;
        }
        return;
    },
    isSimple: function () {
        return this.get('simple');
    }
});