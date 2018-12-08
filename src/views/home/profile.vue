<template>
    <div class="profile_page">
        <div class="inner">

            <profile-item title="手机号码" summary="" iconUrl="">
                <div v-show="!mobileEdit">
                    <p class="nowState">当前手机号码为: <b id="bwx">{{ mobile }}</b></p>
                    <!-- <el-button @click="mobileEdit=true">{{ userData.Mobile ? "修改手机号" : "绑定手机号" }}</el-button> -->
                </div>
                <div v-show="mobileEdit">
                    <el-input placeholder="请输入新手机号" v-model="newMobile" clearable></el-input>
                    <el-input placeholder="请输入验证码" v-model="mobileCode" style="width:295px;"></el-input>

                    <!-- <get-code-btn :mobileNum="newMobile" :messagetype="2" @alertContent="alertMobile"></get-code-btn> -->

                    <P class="alertContent">{{ mobileAlertContent }}</P>
                    
                    <div style="margin-top: 10px">
                        <el-button class="mobileSaveBtn" type="primary" @click="checkNewMobile()" >保存</el-button>
                        <el-button @click="mobileEdit=false">取消</el-button>
                    </div>
                </div>
            </profile-item>

            <profile-item title="修改密码" summary="" 
                iconUrl="https://suvalue.oss-cn-hangzhou.aliyuncs.com/Data_Serach/Menu_Icon/profile_icon.png">
                <!-- <div v-show="!profileEdit">
                    <p class="nowState">姓名: <b>{{ userData.UserName }}</b></p>
                    <p class="nowState">公司名: <b>{{ userData.CorporateName }}</b></p>
                    <p class="nowState">所属部门: <b>{{ userData.Department }}</b></p>
                    <p class="nowState">职位: <b>{{ userData.Duties }}</b></p>
                    <el-button @click="profileEdit=true">修改基础信息</el-button>
                </div> -->

                <div>
                    <el-input type="password" placeholder="请输入原密码" v-model="userData.oldPass" clearable></el-input>
                    <el-input type="password" placeholder="请输入新密码" v-model="userData.newPass" clearable></el-input>
                    <el-input type="password" placeholder="再次请输入新密码" v-model="userData.newPassAgain" clearable></el-input>

                    <div style="margin-top: 10px">
                        <el-button class="mobileSaveBtn" type="primary" @click="passRevise()" >保存</el-button>
                        <span style="margin:0 10px;"></span>
                        <el-button @click="cancel()">返回</el-button>
                    </div>
                </div>
            </profile-item>

        </div>
    </div>
</template>

<script>
    import profileItem from '@/components/profileItem'
    // import getCodeBtn from '@/components/getCodeBtn'
    
    export default {
		name: "profile",
        data: function() {
            return {
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                //简介部分
                avatarSummary:"选择一张个人正面照片作为头像，让其他成员更容易认识你",
                wechatSummary:"绑定后，可直接使用微信扫描二维码登录，还可以通过微信服务号接收消息通知",
                mobileSummary:"修改手机时会发送短信到新的手机号，请按照短信中的验证码修改你的手机号码",
                mailSummary:"修改手机时会发送短信到新的手机号，请按照短信中的验证码修改你的手机号码",
                //基础信息
                profileEdit: false,
                userData:{
                    ID: 0,
                    HeadPortrait: "",
                    UserName: "",
                    CorporateName: "",
                    Department: "",
                    Duties: "",
                    Mobile: "",
                    Mail: "",
                    LandingCode: "", //微信号
                    oldPass: "", //原密码
                    newPass: "", //新密码
                    newPassAgain: "" //新密码
                },
                wechatEdit: 0,
                //手机号
                mobileEdit: false,
                newMobile:"",
                mobileCode:"",
                mobileAlertContent: "", //修改手机号提示内容
                //邮箱
                mailEdit: false,
                newMail:"",
                mailCode:"",
                mailAlert: ""
            }
        },
        computed:{
            mobile(){
                return this.$getCookie("phoneNum");
            }
        },
        methods:{
            //获取当前用户信息
            getUserInfo(){
                let userid = this.$getSession("userid");
                this.$dataGet("/User/GetUserList", {userid: userid}, (data)=>{
					this.userData = data;
				});
            },
            //修改用户
            userRevise(){
                let params = this.userData;
                //提交
                this.$dataPostXD("/User/PostUpdate", params, (data)=>{
                    this.profileEdit = false;
                });
            },
            //修改密码
            passRevise(){
                if(this.userData.newPass != this.userData.newPassAgain){
                    this.$alert("两次密码不相同！", 2);
                    return false;
                }else{
                    let params = {
                        "phoneNum": this.$getCookie("phoneNum"),
                        "newPwd": this.userData.newPass,
                        "password": this.userData.oldPass
                    }
                    
                    this.$dataPost("/modify", params, (all)=>{
                        if(1==all.result){
                            this.$alert("修改成功！", 1);
                            let timer = setTimeout(()=>{
                                this.logout();
                                clearTimeout(timer);
                            }, 1000);
                            
                        }else{
                            this.$alert(all.msg, 2);
                        }
                    });
                }
            },
            //验证新手机号
            checkNewMobile(){
                let params = {
                    mobile: this.newMobile,
                    code: this.mobileCode,
                    type: 1,
                    messagetype: 1
                }
                //验证
                this.$dataGet("/User/CheckMessage", params, (data,all)=>{
                    if(all.state==1){
                        this.userData.Mobile = this.newMobile; //修改手机号
                        this.userRevise(); //向后端提交
                        this.mobileEdit = false;
                    }else{
                        this.mobileAlertContent = all.message; //显示错误提示
                    }     
                });
            },
            //接收子组件传值(获取手机验证码)
            alertMobile(data){
                this.mobileAlertContent = data;
            },
            //退出登录
			logout(){
				this.$clearCookie("userid"); //清除cookie
				this.$clearCookie("userName"); //清除cookie
				this.$router.push("/login"); //改变路由
            },
            cancel(){
                this.$router.push("/project"); //改变路由
            }
        },
        components:{
            profileItem
        }

	}
</script>

<style lang="scss" type="text/css">
    .profile_page{
        padding: 0 5%;
        //background-color: #fff;
        height: 100%;
        overflow-y: auto;

        .avatar_box{
            display: inline-block;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
        }
        .avatarBtn{
            position: absolute;
            left: 140px;
            top: 40px;
        }
        p.nowState{
            font-size: 16px;
            height: 24px;
            line-height: 24px;
            margin-bottom: 30px;
            color: #909090;
        }
        .el-input{
            margin-bottom: 18px;
        }
        //保存手机号按钮
        .mobileSaveBtn{
            margin-left: 0;
        }
        p.alertContent{
            color: #f00;
            height: 18px;
            line-height: 18px;
        }
        //获取验证码按钮
        .getCodeBtn{
            width: 128px;
        }

    }

</style>