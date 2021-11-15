
module.exports = {
    outputDir: './dist/',
    runtimeCompiler: true,
    // publicPath: process.env.NODE_ENV === 'production'? '/static/RecruiterApp/' : 'http://0.0.0.0:8080/',

    css: {
        loaderOptions: {
            sass: {
                // prependData: '@import "~@/sass/variables.scss"',
                implementation: require("sass"),
                // fiber: require("fibers")
            }
        },
        sourceMap: true
    },

    chainWebpack: config => {
        // ["vue-modules", "vue", "normal-modules", "normal"].forEach((match) => {
        //     config.module.rule('scss').oneOf(match).use('sass-loader')
        //         .tap(opt => Object.assign(opt, { prependData: `@import '~@/sass/variables.scss';` }))
        // });
        config.optimization
            .splitChunks(false)

        config.resolve.alias
            .set('__STATIC__', 'static')

        config.devServer
            .host('0.0.0.0')
            .port(8080)
            .hotOnly(true)
            .watchOptions({poll: 1000})
            .headers({"Access-Control-Allow-Origin": ["*"]})
            .open()
    },

    transpileDependencies: [
      'vuetify'
    ]
}
