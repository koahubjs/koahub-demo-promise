var Koahub = require("koahub").default;
var hbs = require("koahub-handlebars");
var helpers = require("handlebars-helpers");
var model = require("./util/model.util");

var app = new Koahub();
var koa = app.getKoa();

koa.use(hbs.middleware({
    extname: '.html',
    viewPath: './www',
    layoutsPath: './www',
    partialsPath: './www',
    disableCache: true //true: 模版修改立即生效（性能差），false：模版修改重启生效（性能提升10倍）
}));

helpers({
    handlebars: hbs.handlebars
});

koa.use(function (ctx, next) {

    ctx.model = model;

    return next();
});

app.run();