import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import TerserPlugin from 'terser-webpack-plugin'

export default (env, argv) => {
  const isProd = argv.mode === 'production'

  const config = {
    entry: './src/index.tsx',
    output: {
      // 因为开发环境中，chunkhash与HotModuleReplacementPlugin有冲突，所以两个环境分别设置
      filename: isProd ? '[name].[chunkhash:8].js' : '[name].[fullhash:8].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'import',
                  {
                    libraryName: '@blueprintjs/core',
                    transformToDefaultImport: false,
                    customName: (name) => {
                      const BASE_PATH = `${__dirname}/node_modules/@blueprintjs/core/lib/esm`

                      const PATH_MAP = {
                        button: ['button', 'buttons'],
                        'input-group': ['forms', 'inputGroup'],
                        'menu-item': ['menu', 'menuItem'],
                        toaster: ['toast', 'toaster'],
                      }

                      if (name === 'position') {
                        return `${BASE_PATH}/common/position`
                      }

                      const info = PATH_MAP[name]
                      if (info) {
                        const [folder, filename] = info
                        return `${BASE_PATH}/components/${folder}/${filename}`
                      }

                      return `${BASE_PATH}/components/${name}/${name}`
                    },
                  },
                ],
              ],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
          include: /node_modules/,
        },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': '{}', // 临时修复@blueprintjs报错“process is not defined”
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        favicon: path.resolve(__dirname, 'favicon.ico'),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
      }),
      // new BundleAnalyzerPlugin(),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
    },
  }
  return config
}
