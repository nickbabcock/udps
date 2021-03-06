/* eslint-disable global-require,no-underscore-dangle */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ip = require('ip').address();

const __DEV__ = JSON.parse(process.env.DEBUG || 'false');
const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__,
  'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
});
const htmlWebPackPlugin = new HtmlWebpackPlugin({
  title: 'Umich DPS',
  template: 'index.ejs'
});

const plugins = __DEV__ ? [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  htmlWebPackPlugin,
  devFlagPlugin
] : [
  new CleanWebpackPlugin(['dist']),
  devFlagPlugin,
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  htmlWebPackPlugin
];

const entry = ['eventsource-polyfill', 'babel-polyfill'].concat(
  __DEV__ ? [`webpack-dev-server/client?http://${ip}:3000`, 'webpack/hot/only-dev-server'] : []
).concat(['./js/index.js']);

const jsInclude = (__DEV__ ? [path.resolve(__dirname, 'test')] : []).
  concat([path.resolve(__dirname, 'js')]);

module.exports = {
  devtool: __DEV__ ? 'cheap-module-eval-source-map' : 'source-map',
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: path.join('js', 'bundle-[hash].js'),
    publicPath: '/',
    hot: __DEV__
  },
  plugins,
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], include: jsInclude },
      { test: /\.css$/, loaders: ['style', 'css?modules&sourceMap', 'postcss'] },
      { test: /\.md$/, loaders: ['html', 'markdown'] },
      { test: /\.json$/, loaders: ['json'] }
    ]
  },
  postcss: (wb) =>
    [
      require('postcss-import')({
        addDependencyTo: wb
      }),
      require('postcss-cssnext')(),
      require('lost')(),
      require('postcss-reporter')({
        clearMessages: true
      })
    ],
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
