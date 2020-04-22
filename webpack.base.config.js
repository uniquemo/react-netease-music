import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default (env, argv) => {
  const config = {
    entry: './src/index.tsx',
    output: {
      // 因为开发环境中，chunkhash与HotModuleReplacementPlugin有冲突，所以两个环境分别设置
      filename: argv.mode === 'production' ? '[name].[chunkhash:8].js' : '[name].[hash:8].js'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          use: {
            loader: 'babel-loader'
          },
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html')
      })
    ]
  }
  return config
}
