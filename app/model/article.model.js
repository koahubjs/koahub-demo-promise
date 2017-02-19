var bookshelf = require("./../data/bookshelf.init");

var model = bookshelf.Model.extend({
    tableName: 'article',
    hasTimestamps: true
});

module.exports = model;
