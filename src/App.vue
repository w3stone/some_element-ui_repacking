<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style lang="scss" type="text/css">
    #app {
        //font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        height: 100%;
    }
    html,body{
        font-size: 14px;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        overflow-y: auto;
        font-family: Arial,'Microsoft YaHei';
    }
    .clearfix::after{
        content:"";
        display: table;
        clear: both;
    }
    .clearfix{
        *zoom:1;
    }
    h1,h2,h3,h4,h5,h6{
        margin: 0;
        padding: 0;
        cursor: default;
    }
    div,p{
        margin: 0;
        padding: 0;
    }
    img{
        width: 100%;
        vertical-align: middle;
    }
    i{
        font-style: normal;
    }
    ul,ol,ul li,ol li{
        list-style: none;
        padding: 0;
        margin: 0;
        cursor: default;
    }
    a{
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
        &:focus{
            outline: none;
        }
    }
    input,button{
        border: none;
        outline: none;
    }
    .center{
        position: absolute;
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .updownCneter{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    /**设置滚动条的样式**/
    ::-webkit-scrollbar {
        width: 10px;
        height: 16px;
    }
    //滚动槽
    ::-webkit-scrollbar-track {
        background: transparent;
        //border: 1px solid #bbb;
        border-radius: 10px;
    }
    //滚动条滑块
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #ccc;
    }
    
</style>
