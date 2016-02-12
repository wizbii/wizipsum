const webpackConfig = require('./webpack.config')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['tests/*.spec.js'],
    webpack: { module: webpackConfig.module },
    webpackServer: { noInfo: true },
    exclude: [],
    preprocessors: { 'tests/*.spec.js': ['webpack'] },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    captureTimeout: 60000,
    browsers: ['PhantomJS'],
    singleRun: false,
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-phantomjs-launcher')
    ]
  })
}
