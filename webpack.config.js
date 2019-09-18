//webpack 是基于 node 构建的，所以 webpack 配置文件中任何合法的 node 代码都是支持的
var path = require('path');

var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },

    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],

    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            //loader 里面也可以传参，跟url一样，后面加个？就可以
            //limit 给定的值是图片的大小，单位 byte，引用的图片大于或等于 limit 值，则不会被转为 base64 格式的字符串
            //如果图片小于给定的 limit 值，则会被转为 base64 的字符串,[name].[ext] 让webpack 打包前后图片名称和后缀一致
            //[hash:8]- 是为了防止两张图名称一样时（内容不同），webpack 以后面那张为准，导致2张图一样，没hash时如果不一样是因为一张大于limit值一张小于limit值
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=368520&name=[hash:8]-[name].[ext]' },
            //处理字体
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
            //Babel 转换高级语法
            { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
            //处理 .vue 文件的 loader
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },

    resolve: { //在 main.js 文件 用 import Vue from 'vue' 导入 vue 时需配置 alias
        alias: { //设置 vue 被导入时的包的路径
            "vue$": "vue/dist/vue.js"
        }
    }

}