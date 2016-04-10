const webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';
webpackConfig.externals = {
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': 'window'
};

module.exports = (config) => {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha', 'chai'],
    files: ['tests.webpack.js'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    autoWatch: true
  });
};
