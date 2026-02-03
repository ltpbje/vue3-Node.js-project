const {defineConfig} = require('@vue/cli-service')

// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
    // 开发服务器配置
    transpileDependencies: true, // 启用对依赖的转译，确保兼容性
    devServer: {
        // 代理配置，用于解决跨域问题
        proxy: {
            '/adminapi':{ // 匹配以 /adminapi 开头的请求
                target: 'http://localhost:3000', // 将请求代理到目标服务器
                changeOrigin:true // 启用跨域，修改请求头的 origin
         }
     }  
    },
    configureWebpack: {
      plugins: [
        require('unplugin-auto-import/webpack').default({
          resolvers: [ElementPlusResolver({ locale: 'zh-cn' })]
        }),
        require('unplugin-vue-components/webpack').default({
          resolvers: [ElementPlusResolver({ locale: 'zh-cn' })]
        }),
            // AutoImport({
            //     resolvers: [ElementPlusResolver()],
            // }),
            // Components({
            //     resolvers: [ElementPlusResolver()],
            // }),
        ]
    }
})