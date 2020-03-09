let extra_env = {}
if (process.env.NODE_ENV === 'production') {
  extra_env = {
    assetsDir: 'assets',
    outputDir: 'admin',
    publicPath: './'
  }
}
module.exports = {		
  devServer: {
    proxy: {
      '/qr': {
        target: 'http://192.168.1.66:8002',
        ws: false,
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false,
  publicPath: 'qr'
  // ...extra_env
}
 // http://192.168.1.66:8002
 // http://192.168.1.205:8002 