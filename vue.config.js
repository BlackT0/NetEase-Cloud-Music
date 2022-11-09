const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,

    pluginOptions: {
        prerenderSpa: {
            registry: undefined,
            renderRoutes: [
                '/'
            ],
            useRenderEvent: true,
            headless: true,
            onlyProduction: true
        }
    }
})
