var Backbone = require('backbone');
var dispatcher = module.exports = _.extend({}, Backbone.Events);
dispatcher.on('block:delete', function (params) {
    var id = params.id;
    var collection = params.collecion;
    var block = collection.getByBlockId(id);
    if (block.isSimple()) {
        collection.remove(id);
        return;
    };
    this.trigger('delete-popup:open', params);
});
