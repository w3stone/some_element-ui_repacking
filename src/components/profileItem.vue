<template>
    <div class="profile_item">
        <div class="inner">
            <h3 class="title">
                <i class="profile_icon" :style="{'backgroundImage':'url('+ iconUrl +')'}"></i>
                <span>{{title}}</span>
            </h3>
            <div class="clearfix">
                <div class="left">
                    <p class="summary">{{summary}}</p>
                </div>

                <div class="right">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "profileItem",
        props: ["title", "summary", "iconUrl"]
	}
</script>

<style lang="scss" scoped="" type="text/css">
    .profile_item{
        padding: 35px 0;
        background-color: #fff; 
        border-bottom: 1px solid #e6e6e6;
        margin: 25px 0;
        box-shadow: 0 0px 0 rgba(0,0,0,.05), 0 0 15px rgba(0,0,0,.18), 0 1px 3px rgba(0,0,0,.05);

        .inner{
            width: 80%;
            margin: 0 auto;
        }

        h3{
            position: relative;
            font-size: 18px;
            font-weight: normal;
            color: #696969;
            height: 40px;
            line-height: 40px;
        }
        //图标
        .profile_icon{
            position: absolute;
            width: 26px;
            height: 26px;
            text-align: center;
            opacity: 0.8;
            background-repeat: no-repeat;
            background-position: center top;
            background-size: auto 100%;
            top: 6px;
            left: -45px;
        }

        .left{
            float: left;
            width: 224px;
            min-height: 10px;
            margin-right: 95px;

            .summary{
                font-size: 14px;
                color: #c4c4c4;
                line-height: 24px;
            }
        }

        .right{
            position: relative;
            width: 440px;
            float: left;
        }

    }

</style>