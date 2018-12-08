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
    devServer: { //测试环境代理
        proxy:{
            '/DemandManagePlatform/api': {
                //target: 'http://192.168.18.159:8080',
                target: 'http://192.168.0.123:8080',
                changeOrigin: true
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