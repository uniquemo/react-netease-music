参考官网：https://webpack.js.org/migrate/5/

## 升级所有webpack相关包
- webpack: ^4.43.0 => ^5.1.3
- webpack-cli: ^3.3.11 => ^4.0.0
- webpack-dev-server: ^3.10.3 => ^3.11.0
- webpack-merge: ^4.2.2 => ^5.2.0


## webpack报错找不到'webpack-cli/bin/config-yargs'
参考issue：[Error: Cannot find module 'webpack-cli/bin/config-yargs'](https://github.com/webpack/webpack-dev-server/issues/2759)

原因：webpack-dev-server不能与webpack-cli 4一起工作，webpack-cli提供了@webpack-cli/serve来调用webpack-dev-server，意味着可以使用`webpack serve`来调用webpack-dev-server


## webpack devtool报错
> Browserslist: caniuse-lite is outdated. Please run:
npx browserslist@latest --update-db
[webpack-cli] Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema.
> - configuration.devtool should match pattern "^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$".
   BREAKING CHANGE since webpack 5: The devtool option is more strict.
   Please strictly follow the order of the keywords in the pattern.

问题：devtool格式不对，修改即可。


## 浏览器端报错process is not defined
这是blueprintjs报的错：["process is not defined" error in common/classes.js](https://github.com/palantir/blueprint/issues/3739)

临时修复方案：
```javascript
new webpack.DefinePlugin({
  'process.env': '{}',
}),
```


## 构建时控制台报warning
> (node:33416) [DEP_WEBPACK_MAIN_TEMPLATE_RENDER_MANIFEST] DeprecationWarning: MainTemplate.hooks.renderManifest is deprecated (use Compilation.hooks.renderManifest instead)
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:33416) [DEP_WEBPACK_CHUNK_TEMPLATE_RENDER_MANIFEST] DeprecationWarning: ChunkTemplate.hooks.renderManifest is deprecated (use Compilation.hooks.renderManifest instead)
(node:33416) [DEP_WEBPACK_MAIN_TEMPLATE_HASH_FOR_CHUNK] DeprecationWarning: MainTemplate.hooks.hashForChunk is deprecated (use JavascriptModulesPlugin.getCompilationHooks().chunkHash instead)
ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from undefined
ℹ ｢wds｣: Content not from webpack is served from ./dist
ℹ ｢wds｣: 404s will fallback to /index.html
(node:33416) [DEP_WEBPACK_MAIN_TEMPLATE_GET_ASSET_PATH] DeprecationWarning: MainTemplate.getAssetPath is deprecated (use Compilation.getAssetPath instead)
(node:33416) [DEP_WEBPACK_COMPILATION_NORMAL_MODULE_LOADER_HOOK] DeprecationWarning: Compilation.hooks.normalModuleLoader was moved to NormalModule.getCompilationHooks(compilation).loader
(node:33416) [DEP_WEBPACK_COMPILATION_ASSETS] DeprecationWarning: Compilation.assets will be frozen in future, all modifications are deprecated.
BREAKING CHANGE: No more changes should happen to Compilation.assets after sealing the Compilation.
	Do changes to assets earlier, e. g. in Compilation.hooks.processAssets.
	Make sure to select an appropriate stage from Compilation.PROCESS_ASSETS_STAGE_*.
(node:33416) [DEP_WEBPACK_MODULE_ID] DeprecationWarning: Module.id: Use new ChunkGraph API
(node:33416) [DEP_WEBPACK_MODULE_UPDATE_HASH] DeprecationWarning: Module.updateHash: Use new ChunkGraph API
(node:33416) [DEP_WEBPACK_CHUNK_MODULES_ITERABLE] DeprecationWarning: Chunk.modulesIterable: Use new ChunkGraph API
(node:33416) [DEP_WEBPACK_TEMPLATE_PATH_PLUGIN_REPLACE_PATH_VARIABLES_HASH] DeprecationWarning: [hash] is now [fullhash] (also consider using [chunkhash] or [contenthash], see documentation for details)
(node:33416) [DEP_WEBPACK_CHUNK_GROUP_GET_MODULE_INDEX_2] DeprecationWarning: ChunkGroup.getModuleIndex2 was renamed to getModulePostOrderIndex
(node:33416) [DEP_WEBPACK_MAIN_TEMPLATE_GET_PUBLIC_PATH] DeprecationWarning: MainTemplate.getPublicPath is deprecated (use Compilation.getAssetPath(compilation.outputOptions.publicPath, options) instead)

### DeprecationWarning: MainTemplate.hooks.hashForChunk is deprecated
升级了terser-webpack-plugin还是有问题。

参考：[next.js Webpack 5 support](https://github.com/vercel/next.js/issues/13341)

主要是`mini-css-extract-plugin`引起的。
- 解决：升级mini-css-extract-plugin，^0.9.0 => ^1.1.0；

### 执行命令检查warning的详细信息
参考：
- [Show loader name together with deprecation warning](https://github.com/webpack/loader-utils/issues/75)
- [Debugging webpack 5 cache issue](https://github.com/webpack/webpack/issues/10707)

```bash
node --trace-deprecation node_modules/.bin/webpack serve --mode=development
```

发现`html-webpack-plugin`也要升级。^4.2.0 => ^5.0.0-alpha.5
相关issue：
- [html-webpack-plugin cann't working with webpack-v5.0.0-bata.22](https://github.com/jantimon/html-webpack-plugin/issues/1488)
- [Webpack 5 "BREAKING CHANGE" warning](https://github.com/jantimon/html-webpack-plugin/issues/1501)

### DeprecationWarning: [hash] is now [fullhash]
解决：将配置中的hash改成fullhash。

### clean webpack plugin options.output.path is not defined
解决：在output配置中添加path。

### DeprecationWarning: optimizeChunkAssets is deprecated
问题：`optimize-css-assets-webpack-plugin`引起。

解决：
- 参考issue，[optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/134)；
- 使用`css-minimizer-webpack-plugin`进行替换。
