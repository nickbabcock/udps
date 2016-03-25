const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

const ip = require('ip').address();

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill',
    'babel-polyfill',
    `webpack-dev-server/client?http://${ip}:3000`,
    'webpack/hot/only-dev-server',
    './js/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Umich DPS',
      template: 'index.ejs'
    }),
    devFlagPlugin
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style', 'css?modules&sourceMap', 'postcss'] },
      { test: /\.md$/, loaders: ['html', 'markdown'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
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
