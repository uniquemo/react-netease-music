import merge from 'webpack-merge'
import baseConfig from './webpack.base.config'
import devConfig from './webpack.dev.config'
import prodConfig from './webpack.prod.config'

export default (env, argv) => {
  let config = argv.mode === 'development' ? devConfig : prodConfig
  return merge(baseConfig(env, argv), config)
}
