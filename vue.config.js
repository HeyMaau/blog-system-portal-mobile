const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.externals = {
                'axios': 'axios',
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'vant': 'vant',
                'viewerjs': 'Viewer',
                'highlight.js': 'hljs'
            }
        }
    },
    pages: {
        index: {
            entry: process.env.NODE_ENV === 'production' ? 'src/main-prod.js' : 'src/main.js',
            title: '卧卷'
        }
    }
})
