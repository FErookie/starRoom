const account = require('../services/auth');
const config = require('../conf/config');
const baseUrl = "localhost:3000";
const returns = require('../lib/return');

exports.register = async (ctx) => {
    ctx.checkBody("nickName").notEmpty();
    ctx.checkBody("password").notEmpty();
    let data = ctx.request.body;
    let imageUrl = "";
    const file = ctx.request.header.file;
    let status = await account.checkUser(data.nickname, data.password);
    if(status !== false){
       ctx.returns(returns.code.PARAM_ERROR, "已经注册过 请登录", null);
       return;
    }
    if(file === undefined){
        console.log("这是一个使用默认头像的小伙子");
        let re = await account.addUser(data.nickname, data.password);
        console.log(re + "!!拜托了这对我很重要");
        ctx.returns(returns.code.SUCCESS, re, null);
    }else{
        const reader = fs.createReadStream(file.path);	// 创建可读流
        const ext = file.name.split('.').pop();		// 获取上传文件扩展名
        const randomNumber = Math.random().toString();
        const upStream = fs.createWriteStream(`../public/img/${randomNumber}.${ext}`);		// 创建可写流
        reader.pipe(upStream);	// 可读流通过管道写入可写流
        imageUrl = baseUrl + `/static/image/${randomNumber}.${ext}`;
        let re = await account.addUser(data.nickname, data.password);
        ctx.returns(returns.code.SUCCESS, re , null);
    }
};
exports.login = async (ctx) => {
    ctx.checkBody("nickName").notEmpty();
    ctx.checkBody("password").notEmpty();
    let data = ctx.request.body;
    console.log(1);
    let res = await account.checkUser(data.nickname, data.password);
    ctx.returns(returns.code.SUCCESS, res , null);//注册成功的时候会把用户的id返回回去
};
//想了想暂时不加token 也不做登陆状态持续化
