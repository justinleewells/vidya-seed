const path = require('path')
const shared = require('./webpack.shared.js')

module.exports = Object.assign(shared, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  devtool: 'inline-source-map',
})
