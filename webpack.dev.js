import path from 'path'
import shared from './webpack.shared.js'
import { fileURLToPath } from 'url'

const DIRNAME = path.dirname(fileURLToPath(import.meta.url))

export default Object.assign(shared, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(DIRNAME, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  devtool: 'inline-source-map',
})
