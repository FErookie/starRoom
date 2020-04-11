const returns = require('../lib/return');

module.exports = async (ctx, next) => {
    ctx.returnParamsError = (err) => {
        ctx.body = returns.msgWrapper(returns.code.PARAM_ERROR, null, err || ctx.errors);
    };

    ctx.returnIfParamsError = () => {
        if (ctx.errors) {
            ctx.returnParamsError();
            return true;
        }
        return false;
    };


    ctx.returns = (...args) => {
        let [code, data, err] = [returns.code.SUCCESS, null, null];
        if (args.length === 1) {
            [data] = args;
        } else if (args.length === 2) {
            [code, data] = args;
        } else {
            [code, data, err] = args;
        }
        ctx.body = returns.msgWrapper(code, data, err);
    };

    await next();

    ctx.returns = null;
    ctx.returnIfParamsError = null;
    ctx.returnParamsError = null;
};
