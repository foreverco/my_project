/* webpack 中支持 ES6 模块化 和 common.js 规范 */
const path = require('path');
const webpack = require('webpack');
// 引入所需插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



// 模块输出
module.exports = {
  mode: 'development', // development 开发 production 生产
  //打包的入口文件
  entry: {
    //入口文件路径,确定入口文件
    app: path.resolve(__dirname, 'src/index.js')
    //app:'./src/index.js'
  },
  //打包的出口文件
  output: {
    //打包后的文件名 [name] [hash:5]
    filename: '[name]-[hash:3].js',
    //打包文件存放的路径
    path: path.resolve(__dirname, 'dist')
  },
  //设置 loader 匹配规则
  module: {
    rules: [ // 使用不同的loader匹配不同的文件
      {
        test: /\.(c|le)ss$/, //匹配以.css结尾的文件
        // loader的处理顺序是从后往前
        use: [
          /* {
                      loader:'style-loader',
                      options:{
                        singleton:true
                      }
                    }*/
          //单独打包就不需要 style-loader
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }, { //css-loader 的后面,less-loader的前面
            loader: 'postcss-loader',
            options: {
              //标识符,表示使用的插件是给postcss用的
              ident: 'postcss',
              plugins: [
                //引入插件并调用
                require('autoprefixer')(),
                require('postcss-sprites')({
                  spritePath:'./assets/images'
                })
              ]
            }
          }, {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // 文件的大小
            limit: 2048, // 以B为单位 1kb=1024b
            // [ext] 就是原本图片的后缀
            name: '[name]-min.[ext]',
            publicPath: '../assets/images',
            output: 'assets/',
            useRelativePath: true
          }
        },/* {// 图片压缩
          loader:'img-loader',
          options:{
            plugins:[
              // require('imagemin-mozjpeg')(),
              require('imagemin-pngquant')({
                // 质量
                quality: 60,
                // 进步
                progressive:true
              })
            ]
          }
        } */]
      }
    ]
  },

  //配置devServer
  devServer:{
    // 设置基本的目录结构
    contentBase: path.resolve(__dirname,'dist'),
    // 服务器端的ip地址
    host:'localhost',
    // 服务器端是否开启压缩
    compress:true,
    // 配置服务器端
    port:8080,
    // 是否自动开启浏览器
    open:true,
    // 是否把报错信息展示在页面
    overlay:{ // 遮罩层显示错误信息
      errors:true
    },
    // 是否开启 热加载
    hot:true,
    // 设置代理
    proxy:{
      //代理路径 url
      '/search/rec':{
        //代理的真实url
        target:'http://soapi.yinyuetai.com/search/rec',
        changeOrigin:true,
      }
    }
  },

  plugins: [ //数组,插件的使用都是需要 new 的
    new HtmlWebpackPlugin({ //配置参数
      filename: 'index.html', //默认值
      //template: 指定一个模板
      minify: { //是否压缩代码
        //去除空格代码
        collapseWhitespace: true,
      }
    }),
    //打包之前先清空
    new CleanWebpackPlugin('dist'),
    //单独打包css插件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    // 调用热加载插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
}