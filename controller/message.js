//这个controller的调用不在router里 在socketio过程中进行调用 就是增和查
const returns = require('../lib/return');
const messageService = require('../services/messages');
exports.queryMessage = async(ctx) => {
    ctx.checkBody("offset").notEmpty();
    let data = ctx.request.body;
    let res = await messageService.queryMessage(data.offset, data.limit);
    ctx.returns(returns.code.SUCCESS, res, null);
};
