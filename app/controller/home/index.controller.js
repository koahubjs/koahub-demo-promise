module.exports = class extends koahub.controller {

    _initialize() {
        //设置模版主题
        this.state.theme = 'home';
    }

    index() {

        var context = {version: process.version, time: new Date()};
        return this.render('index', context);
    }
}
