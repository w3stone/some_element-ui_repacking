const webpack= require('webpack');

module.exports = {
    lintOnSave: false,  //eslint 是否在保存行为的时候检查代码
    productionSourceMap: false,
    baseUrl: "./", //导出路径
    assetsDir: "web", //静态资源文件夹
    css: { //全局scss变量
        loaderOptions:{
            sass:{
                data: `@import "@/assets/scss/color.scss";`
            }
        }
    },
    configureWebpack: {
        plugins:[
            new webpack.ProvidePlugin({
               $: "jquery",
               jQuery: "jquery",
               "window.jQuery":"jquery",
               "window.$": "jquery",
               Enumerable: "linq"
            })
        ]
    }
}