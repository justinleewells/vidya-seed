const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
  resolve: {
    alias: {
      '@enums': path.resolve(__dirname, 'src/enums/'),
      '@game-objects': path.resolve(__dirname, 'src/game-objects'),
      '@src': path.resolve(__dirname, 'src'),
      '@utils': path.resolve(__dirname, 'utils'),
    },
  },
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
