import webpack from 'webpack'

export default {
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // contentBase: './dist',
    hot: true
  }
}
