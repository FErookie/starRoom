const db = require('../db/index');
const { user } = db.models;
const crypto = require('crypto');

exports.addUser = async function (nickname, password, headImageUrl ){
    let passwordM = crypto.createHash('md5').update(password).digest('hex');
    let res = await user.create({
        nickname: nickname,
        passwordHash: passwordM,
        headImageUrl: headImageUrl
    });
    console.log(res);
    return res.dataValues;
    //考虑一下  其实可能存base64也可以
};

exports.checkUser = async function (nickname, password){
    let passwordM = crypto.createHash('md5').update(password).digest('hex');
    return user.findAll({
        where: {
            nickname: nickname,
            passwordHash: passwordM
        }
    }).then(data=>{
        return data[0] === undefined ? false : data[0].dataValues;
    })
};
