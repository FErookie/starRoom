//基本逻辑是 用户和好友的聊天是一对一聊天 临时房间 关闭之后就会丢失（那这个聊天数据我其实没必要存在数据库 存在localstorge就可以） 而群组是永久的房间 关闭之后也不会丢失
export default {
    url: "http://localhost:3000",
    user:{
        name: "",
        id: "",
        imgurl: ""
    }, //用户个人信息
    messageList: [
    ],//历史信息
    nowMessage: [
    ], //首屏展示的当前message 这个message 肯定就是用roomid 加用户id 从数据库里请求
    fakeInfo: {
        nickname: "shuda",
        password: "gsd741741"
    }
}
