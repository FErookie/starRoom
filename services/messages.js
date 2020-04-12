// 存储和查询的话就当是历史记录好了 也就是个增加和查询 因为查历史记录实际上是整个表做查询 不必要到具体哪个人
const db = require('../db/index');
const {user, message} = db.models;

exports.addMessage = async function (userid, content, asImage = '') {
    let User = await user.findOne({
        where: {
            id: userid
        }
    });
    await User.createMessage({
        content: content,
        asImage: asImage
    });
};
exports.queryMessage = async function (offset, limit) {
    //考虑到可能一屏放不下全部 所以可以按时间倒序做一个分页 默认的情况下就是从零开始 其实就是第一次发起的时候 查十个数据
    limit = limit || 10;
    let res = await message.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        offset: offset,
        limit: limit
    });
    return res;
};
