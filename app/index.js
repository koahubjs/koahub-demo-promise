var Koahub = require("koahub").default;
var hbs = require("koahub-handlebars");
var convert = require("koa-convert");
var body = require("koa-body");
var serve = require("koa-static");
var session = require("koa-session2").default;
var helpers = require("handlebars-helpers");
var model = require("./util/model.util");

var app = new Koahub();
var koa = app.getKoa();

koa.use(convert(body({multipart: true})));
koa.use(convert(serve('./www')));
koa.use(session({
    key: "koahubjs",   //default "koa:sess"
}));
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

    if (!ctx.request.body.files) {
        ctx.post = ctx.request.body;
    } else {
        ctx.post = ctx.request.body.fields;
        ctx.file = ctx.request.body.files;
    }

    return next();
});

app.run();