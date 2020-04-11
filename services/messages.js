// 存储和查询的话就当是历史记录好了 也就是个增加和查询 因为查历史记录实际上是整个表做查询 不必要到具体哪个人
const db = require('../db/index');
const {message} = db;

exports.addMessage = async function (content, asImage = '') {
    await message.create({
        content: content,
        asImage: asImage
    })
};
exports.queryMessage = async function (content, asImage = '') {
    //考虑到可能一屏放不下全部 所以可以按时间倒序做一个分页

};
