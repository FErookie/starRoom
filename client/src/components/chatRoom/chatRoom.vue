<template>
    <div id="con" style="height: 100%">
        <el-header>

            <el-button round @click="dialogFormVisible = true">登录</el-button>
            <el-dialog title="登录" :visible.sync="dialogFormVisible" center>

                <el-form>

                    <el-form-item label="nickname" prop="num">
                        <el-input v-model="nickname"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="password"></el-input>
                    </el-form-item>

                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="login">登 录</el-button>
                </div>
            </el-dialog>
            <el-button round @click="registerdialogFormVisible = true">注册</el-button>
            <el-dialog title="注册" :visible.sync="registerdialogFormVisible" center>

                <el-form>

                    <el-form-item label="nickname" prop="num">
                        <el-input v-model="nickname"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="password"></el-input>
                    </el-form-item>

                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button  @click="registerdialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="register">注册</el-button>
                </div>
            </el-dialog>
        </el-header>
        <el-container style="height: 100%">
            <el-main>
                <div id="message-box">
                    <ul>
                        <li v-for="item in messages" v-bind:key="item.index" class="message" >
                            <p id="username">{{item.username}}: </p>
                            <p>{{ item.content }}</p>
                        </li>
                    </ul>
                </div>
                <el-input id="input" v-model="input" placeholder="请输入内容 回车表示发送" v-on:keyup.native.enter="emitMessage"></el-input>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "chatRoom",
        data() {
            return {
                username: "游客",
                id:"",
                avatraUrl: "",
                registerdialogFormVisible: false,
                dialogFormVisible: false,
                input: "",
                nickname: "",
                password: "",
                canEmit: false,
                messages: [],
            }
        },
        computed:{
        },
        methods:{
            emitMessage(){
                if(!this.canEmit){
                    return false;
                }else {
                    this.$socket.emit('message', this.input);
                    this.input = '';
                }
            },
            register(){
                let data = {
                    "nickname": this.nickname,
                    "password": this.password,
                };
                axios.post(`${this.$store.state.url}/register`, data)
                    .then(res => {
                        console.log(res);
                        if(res.data.code === 200){
                            this.canEmit = true;
                            this.registerdialogFormVisible = false;
                            this.id = res.data.data.id;
                            this.nickname = res.data.data.nickname;
                            this.avatraUrl = res.data.data.headImageUrl;
                            this.$socket.emit('join', this.id);
                        }else{
                            alert("您已经注册过了 请登录");
                        }
                    })
            },
            login(){
                let data = {
                    "nickname": this.nickname,
                    "password": this.password,
                };
                axios.post(`${this.$store.state.url}/login`, data)
                    .then(res => {
                        console.log(res);
                        if(res.data.code === 200){
                            this.canEmit = true;
                            this.dialogFormVisible = false;
                            this.id = res.data.data.id;
                            this.nickname = res.data.data.nickname;
                            this.avatraUrl = res.data.data.headImageUrl;
                            this.$socket.emit('join', this.id);
                        }else{
                            alert("密码或用户名错误 登陆gg");
                        }
                    })
            }
        },
        sockets:{
            msg(data){
                this.messages.push(data);
            }
        },
        watch:{

        },
    }
</script>

<style>
    #con {
        height: 100%;
    }

    #input {
        float: left;
        position: fixed;
        bottom: 80px;
        width: 80%;
    }

    .message {
        list-style: none;
        padding: 2px;
        border: 1px solid ghostwhite;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    #message-box{
        margin: 2px;
        border: 1px solid ghostwhite;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    #username{
        margin: 0 3px;
    }
    ul{
        margin-left: 2px;
        margin-top: 2px;
        border: 0;
        box-shadow: 0 0px 0px 0;
    }
    p{
        display: inline-block;
    }
    .room-item{
        border: 0.1px solid ghostwhite;
    }
</style>
