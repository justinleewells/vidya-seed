const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const alias = {
  '@assets': path.resolve(__dirname, 'src/assets'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@enums': path.resolve(__dirname, 'src/enums/'),
  '@game-objects': path.resolve(__dirname, 'src/game-objects'),
  '@globals': path.resolve(__dirname, 'src/globals'),
  '@plugins': path.resolve(__dirname, 'src/plugins'),
  '@utils': path.resolve(__dirname, 'src/utils'),
}
fs.readdirSync('./src/types').forEach((type) => {
  alias[`@${type}`] = path.resolve(__dirname, `src/types/${type}`)
})

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.png|\.xml/,
        type: 'asset/resource',
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { alias },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'New Vidya Project',
      hash: true,
      clean: true,
    }),
  ],
}
