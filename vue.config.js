const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin()

module.exports = {
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  publicPath: '/',
  devServer: {
    open: true, // 自动打开浏览器
    host: '0.0.0.0', // 真机模拟，使用
    port: '8080', // 前台代理端口号
    https: false, // https： {type: Booleam}
    // https: true, // https： {type: Booleam}
    // hotOnly: false, // 热更新
    proxy: {
      '/api': {
        // target: 'http://192.168.64.6:8080', // 要访问的跨域的域名
        // target: 'http://192.168.112.9', 
        // target: 'http://192.168.64.120',
        // target: 'http://192.168.64.115',
        // target: 'http://192.168.112.32',
        target: 'http://192.168.64.121',
        // target: 'http://192.168.64.150',
        // target: 'http://192.168.64.9:8084/',
        // target: 'http://47.96.169.126:50080/',
        ws: true, // 如果要代理websockets
        changeOrigin: true, // 开启代理
        pathRewrite: { // 路径重写
          '^/api': '/' // 使用 `/api` 代替 `target` 要访问的跨域的域名
        }
      },
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/css/mixin.scss";`
      }
    }
  },
  configureWebpack: {
    plugins: [
      gitRevisionPlugin,
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(gitRevisionPlugin.version()),
        COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
        BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
      }),
    ]
  },
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
  // 如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: ['webpack-dev-server/client'],
  chainWebpack: config => {
    config.entry.app = ['babel/polyfill', './src/main.js'];
  }
}