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
      '/ymw': {
        target: 'http://192.168.1.128:8080',
        ws: false,
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false,
  publicPath: 'zl'
  // ...extra_env
}
 // target: 'http://39.107.156.39:85',
 // http://192.168.1.150:80
 // http://192.168.1.128:8080
 // 172.16.0.112