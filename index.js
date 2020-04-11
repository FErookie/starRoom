const koa = require('koa');
const koaBody = require('koa-body');
const koaValidate = require('koa-validate');
const router = require('./routers/index');
const middlewares = require('./middlewares/index');
const xmlParser = require('koa-xml-body');
const path = require('path');
const staticServer = require('koa-static');
const staticPath = './static';
const app = new Koa();
middlewares.forEach((middleware) => {
    app.use(middleware);
});

app.use(router.routes());

module.exports = app;
