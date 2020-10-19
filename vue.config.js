module.exports = {
    devServer: {
        host: process.env.VUE_APP_DEVSERVER_HOST,
        port: process.env.VUE_APP_DEVSERVER_PORT,
        proxy: process.env.VUE_APP_BACKEND_URI
    }
}