var knex = require("knex");
var Bookshelf = require("bookshelf");
var db = require("./../config/db.config");

var knex = knex({
    client: 'mysql',
    connection: db
});

var bookshelf = new Bookshelf(knex);
bookshelf.plugin('pagination');

module.exports = bookshelf;
