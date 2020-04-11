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
    if(file === undefined){
        console.log("这是一个使用默认头像的小伙子");
        await account.addUser(data.nickname, data.password);
        ctx.returns(returns.code.SUCCESS, "注册成功" , null);
    }else{
        const reader = fs.createReadStream(file.path);	// 创建可读流
        const ext = file.name.split('.').pop();		// 获取上传文件扩展名
        const randomNumber = Math.random().toString();
        const upStream = fs.createWriteStream(`../public/img/${randomNumber}.${ext}`);		// 创建可写流
        reader.pipe(upStream);	// 可读流通过管道写入可写流
        imageUrl = baseUrl + `/static/image/${randomNumber}.${ext}`;
        await account.addUser(data.nickname, data.password);
        ctx.returns(returns.code.SUCCESS, "注册成功" , null);
    }
};
exports.login = async (ctx) => {
    ctx.checkBody("nickName").notEmpty();
    ctx.checkBody("password").notEmpty();
    let data = ctx.request.body;
    let res = await account.checkUser(data.nickname, data.password);
    res === true ? ctx.returns(returns.code.PARAM_ERROR, "用户名或密码错误", "param error") : ctx.returns(returns.code.SUCCESS, "登录成功", null);
};
//想了想暂时不加token 也不做登陆状态持续化
