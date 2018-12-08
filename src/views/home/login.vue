<template>
    <div class="login">
        <div class="header_bar">
            <img src="https://suvalue.oss-cn-hangzhou.aliyuncs.com/hcs/header_wave.png" />
        </div>

        <canvas id="canvas" ref="canvas" style="width:100%;height:calc(100% - 44px)">
            您的浏览器不支持HTML5 canvas，请换一个浏览器。
        </canvas>

        <!--登陆框-->
        <login-box></login-box>

        <footer>
            <div class="inner clearfix">
                <div class="staff">
                    <p>@ <span>Suvalue</span> STAFF</p>
                </div>
            </div>
        </footer>

    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import loginBox from '@/components/loginBox'

	export default {
        name: "login",
        data (){
            return{
                mobile: "", //输入的手机号码
                vCode: "", //验证码
                alertContent: "", //获取验证码错误提示
                remember: false
            }
        },
        methods:{
            ...mapMutations({
                changeAuthority: 'changeAuthority' //设置弹窗是否可见
            }),
            //canvas相关
            canvasFn(){
                let canvas = this.$refs['canvas'];
                let cxt = canvas.getContext('2d');
                //console.log(canvas, cxt);
                let drops = [];//雨滴数组

                // 获取浏览器窗口宽高，并设置canvas全屏显示（必须给canvas设置宽高，否则会采用默认宽高，对后面绘图的坐标都难以控制（坐标和宽高都难以控制））
		        let w = canvas.width = window.innerWidth;
                let h = canvas.height = window.innerHeight-44;

                // 宽高响应式设置
                window.onresize = function(){
                    let w = canvas.width = window.innerWidth;
                    let h = canvas.height = window.innerHeight-44;
                    //console.log(w, h);
                    cxt.clearRect(0, 0, w, h);
                    //requestAnimationFrame(move);
                    //move();
                } 

                // 创建雨滴对象
                function Drop(){};

                Drop.prototype = {
                    init:function(){//初始化方法（设置每个雨滴的初始属性）
                        this.x = random(0, w);
                        this.y = 0;
                        // y方向的速度值
                        this.vy = random(4, 5);
                        // 雨滴下落的最大y值
                        this.l=random(0.8*h, 0.9*h);
                        
                        this.r=1;// 添加波纹初始半径
                        this.vr=1;// 波纹半径增大的速度
                        this.a = 1;// 判断雨滴消失的透明度
                        this.va = 0.96;//透明度的变化系数
                    },
                    draw:function(){//绘制图形
                        if(this.y > this.l){//雨滴已下落到指定位置,就绘制波纹
                            cxt.beginPath();//先开始路径，每次绘制前，先提笔
                            cxt.arc(this.x,this.y,this.r,0,Math.PI*2,false);
                            cxt.strokeStyle = 'rgb(79,102,183)';
                            cxt.stroke();
                        }else{//绘制下落的雨滴
                            cxt.fillStyle = 'rgb(79,102,183)';
                            cxt.fillRect(this.x,this.y,2,10);
                        }
                            
                        this.update();//每次绘制都更新；
                    },
                    update:function(){//更新坐标位置
                        if(this.y<this.l){
                            this.y+=this.vy;
                        }else{//雨滴下落到指定位置
                            if(this.a>0.01){
                                this.r += this.vr;	
                                if(this.r > 30 ){//当半径大于50后，透明度会越来越大
                                    this.a *= this.va;
                                }
                            }else{
                                this.init();//雨滴重新初始化
                            }
                        }
                    },
                }
        
                // 生成随机数的方法
                function random(min,max){
                    return Math.random()*(max-min)+min;//min-max之间的随机数
                }

                // 实例化对象
                for(var i=0;i<30;i++){
                    setTimeout(function(){
                        var drop = new Drop();
                        drop.init();
                        drops.push(drop);//添加到雨滴数组
                    },i*300)
                }

                function move(){
                    // 先绘制透明层，再绘制雨滴，雨滴就把先把先绘制的透明层覆盖，若干透明层叠加起来，就会越来也不透明
                    cxt.fillStyle = 'rgba(255,255,255, 0.1)';
                    cxt.fillRect(0,0,w,h);
                    for(var i=0;i<drops.length;i++){
                        drops[i].draw();
                    }
                    requestAnimationFrame(move);
                }

                move();

            }
        },
        mounted(){
            //debugger;
            this.canvasFn();
        },
        components:{
            loginBox
        }
	}
	
</script>

<style lang="scss" type="test/css">
    .login{
        width: 100%;
        height: 100%;
        background-color: rgba(245, 245, 245, 0.54);
        overflow-y: hidden;

        .header_bar{
            position: fixed;
            width: 100%;
            top: 0;
        }
        footer{
            position: fixed;
            width: 100%;
            //height: 48px;
            background-color: #fff;
            bottom: 0;
            border-top: 1px solid rgba(0,0,0,.12);

            .inner{
                position: relative;
                width: 1200px;
                height: 44px;
                margin: 0 auto;
                overflow: hidden;
                z-index: 99;
            }

            .staff{
                position: absolute;
                width: 140px;
                overflow: hidden;
                text-align: center;
                animation: moving 24s linear infinite;

                p{
                    height: 20px;
                    line-height: 20px;
                    padding: 12px 0;
                    font-size: 16px;
                    color: #333;

                    span{
                        color: $mainColor;
                        font-weight: bold;
                    }
                }
            }

            @keyframes moving {
                0%{ right: -50px; }
                //50%{ right: 550px; }
                100%{ right: 1200px; }
            }
        }

    }
</style>