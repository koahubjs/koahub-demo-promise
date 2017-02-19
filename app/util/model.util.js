var bookshelf = require("./../data/bookshelf.init");

module.exports = function (_model, options) {

    var model = koahub.models[_model];
    // 自动创建model
    if (!model) {
        model = bookshelf.Model.extend({
            tableName: _model,
            hasTimestamps: true
        });
    }
    options = options || {};
    var pageNum = 25;

    return {
        model: function () {
            return model;
        },
        handle: function (data) {
            if (typeof data === 'object' && data != null) {
                return data.toJSON();
            }
            return data;
        },
        add: function (data) {
            if (!data.id) {
                delete data.id;
            }

            var that = this;
            return model.forge(data).save().then(function (data) {
                return that.handle(data);
            });
        },
        del: function (condition) {

            var that = this;
            return model.forge(condition).destroy().then(function (data) {
                return that.handle(data);
            });
        },
        get: function (condition) {

            var that = this;
            return model.query({where: condition}).fetch(options).then(function (data) {
                return that.handle(data);
            });
        },
        getList: function (condition) {

            var that = this;
            return model.query({where: condition}).fetchAll(options).then(function (data) {
                return that.handle(data);
            });
        },
        getCount: function (condition) {

            var that = this;
            return model.query({where: condition}).count().then(function (data) {
                return that.handle(data);
            });
        },
        getPageList: function (page, callback, option) {
            if (option != undefined && option.pageNum != undefined) {
                pageNum = option.pageNum;
            }

            var that = this;
            return model.query(function (qb) {
                if (typeof callback === 'function') {
                    callback(qb);
                }

                qb.orderBy('id', 'desc');
            }).fetchPage({
                pageSize: pageNum,
                page: page,
                withRelated: options.withRelated
            }).then(function (data) {
                return {
                    data: that.handle(data),
                    pagination: data.pagination
                };
            });
        },
        getQueryList: function (callback) {

            var that = this;
            return model.query(function (qb) {
                if (typeof callback === 'function') {
                    callback(qb);
                }

                qb.orderBy('id', 'desc');
            }).fetchAll(options).then(function (data) {
                return that.handle(data);
            });
        },
        getQueryCount: function (callback) {

            var that = this;
            return model.query(function (qb) {

                if (typeof callback === 'function') {
                    callback(qb);
                }
            }).count().then(function (data) {
                return that.handle(data);
            });
        }
    };
}