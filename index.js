const koa = require('koa');
const koaBody = require('koa-body');
const koaValidate = require('koa-validate');
const router = require('./routers/index');
const middlewares = require('./middlewares/index');
const xmlParser = require('koa-xml-body');
const path = require('path');
const staticServer = require('koa-static');
const staticPath = './static';//如果前端觉得不要前后端分离就存在这里好了
const app = new Koa();
middlewares.forEach((middleware) => {
    app.use(middleware);
});
app.use(static(
    path.join( __dirname,  staticPath)
));
app.use(router.routes());
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 50 * 1024 * 1024
    }
}));
module.exports = app;
