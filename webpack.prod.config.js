import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'
import cssnano from 'cssnano'

export default {
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano
    })
  ]
}
