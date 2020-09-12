import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import cssnano from 'cssnano'

export default {
  module: {
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: true,
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              },
              importLoaders: 1
            }
          },
          'postcss-loader'
        ],
        include: /src/
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano
    })
  ]
}
