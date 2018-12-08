<template>
    <div class="login_box center">
        <div class="form_box">
            <div class="mobile_input">
                <div class="form_item">
                    <i class="el-icon-mobile-phone updownCneter"></i>
                    <el-input  type="text" placeholder="请输入手机号" v-model="mobile" clearable></el-input>
                </div>
                
                <div class="form_item">
                    <i class="el-icon-goods updownCneter"></i>
                    <el-input  type="password" placeholder="请输入密码" v-model="password" clearable 
                        @keydown.native.enter="loginFn"></el-input>
                </div>
            </div>

            <p class="alert">{{alertContent}}</p>

            <div class="checkbox checkbox-adv">
                <!-- <label for="remember_me">
                    <input class="" id="remember_me" name="remember_me" type="checkbox">
                    <i class=""></i>
                    <span>记住我</span>
                </label> -->
                <!-- <el-checkbox v-model="remember">记住我</el-checkbox> -->
            </div>

            <el-button class="logBtn" type="primary"  @click="loginFn">登录</el-button>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

	export default {
        name: "login",
        data (){
            return{
                mobile: "", //输入的手机号码
                password: "", //输入密码
                vCode: "", //验证码
                alertContent: "", //获取验证码错误提示
                remember: false
            }
        },
        methods:{
            ...mapMutations({
                changeAuthority: 'changeAuthority' //设置弹窗是否可见
            }),
            //登录操作
            loginFn(){
                let params = { 'phoneNum':this.mobile, 'password':this.password };
               
                if(this.mobile!=""){
                    this.$dataPost("/login", params, (all)=>{
                        var data = all.data;
                        //console.log(all);
                        if(1==all.result){ //登录成功
                            this.$setCookie("userid", data.id, 24); //存储cookie(24小时)
                            this.$setCookie("userName", data.userName, 24); 
                            this.$setCookie("phoneNum", this.mobile, 24); 
                            this.$setCookie("authority", data.state, 24); 
                            this.$router.push("/project"); //跳转

                        }else{ //登录失败
                            this.alertContent = data.msg;
                            setTimeout(()=>{
                                this.alertContent = "";
                            },2000);
                        }
                    });

                }else{
                    this.alertContent = "请输入正确的手机号码";
                    setTimeout(()=>{
                        this.alertContent = "";
                    },2000);
                }
            },
            //接收子组件传值(获取验证码)
            alertMobile(data){
                this.alertContent = data;
            }
        }
	}
	
</script>

<style lang="scss" type="test/css">
    .login_box{
        box-sizing: border-box;
        width: 460px;
        height: 440px;
        border: 1.2px solid #ddd;
        padding: 40px;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 0px 0 #e5e5e5, 0 0 15px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.05);

        &::before{
            content: "医院接入流水";
            width: 500px;
            height: 60px;
            line-height: 60px;
            color: #fff;
            font-size: 20px;
            text-indent: 34px;
            letter-spacing: 4px;
            background-color: $mainColor;
            position: absolute;
            right: -1px;
            top: 50px;
            border-radius: 6px 0 0 2px;
        }

        &::after{
            content: "";
            width: 0;
            border: 20.5px solid #ededed;
            border-left-color: transparent;
            border-bottom-color: transparent;
            position: absolute;
            left: -42px;
            top: 110px;
        }

        .form_box{
            padding-top: 105px;
        }
        .form_item{
            position: relative;
        }

        input{
            width: 100%;
            background-color: #fff;
            margin: 14px 0;
            text-indent: 2em;
            height: 48px;
            border: none;
            border-bottom: 1px solid #dcdfe6;
            border-radius: 0;
            
            &:focus{
                border-color: #dcdfe6;
            }
        }

        //手机号
        .mobile_input{
            position: relative;

            i{
                position: absolute;
                left: 12px;
                z-index: 99;
                font-size: 20px;
                color: #909399;
            }
        }
        .checkbox{
            padding: 10px 0;

            label{
                cursor: pointer;
                min-height: 16px;
                padding-left: 14px;
            }
            span{
                user-select: none;
            }
            input[type="checkbox"]{
                display: none;
            }
            input[type="checkbox"]+i{
                display: inline-block;
                vertical-align: middle;
                width: 16px;
                height: 16px;
                background: #fff url('/web/img/unchecked.png')no-repeat center;
                background-size: 16px 16px;
                margin-right: 7px;
                margin-top: -3px;
            }
            input[type="checkbox"]:checked + i{
                background: #fff url('/web/img/checked.png')no-repeat center;
                background-size: 16px 16px;
            }
            
        }

        button{
            height: 42px;
            margin-top: 14px;
            box-shadow: 0 1px 3px rgba(0,0,0,.15), 0 1px 3px 1px rgba(0,0,0,.15);
        }
        //登录按钮
        .logBtn{
            width: 100%;
            background-color: $mainColor;
            font-size: 16px;

            // &:hover{
            //     opacity: .9;
            // }
        }

        .alert{
            height: 20px;
            line-height: 20px;
            color: #f00;
            padding-left: 12px;
            text-indent: 1em;
        }
    }

</style>