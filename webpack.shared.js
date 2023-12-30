import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { fileURLToPath } from 'url'

const DIRNAME = path.dirname(fileURLToPath(import.meta.url))

export default {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(DIRNAME, 'dist'),
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
      '@enums': path.resolve(DIRNAME, 'src/enums/'),
      '@game-objects': path.resolve(DIRNAME, 'src/game-objects'),
      '@src': path.resolve(DIRNAME, 'src'),
      '@utils': path.resolve(DIRNAME, 'utils'),
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
