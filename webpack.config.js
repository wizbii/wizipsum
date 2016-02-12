var webpack = require('webpack')
const argv = require('yargs').argv
const pkg = require('./package.json')

const banner = [
  '/*!',
  ` * ${pkg.name} - v${pkg.version}`,
  ` * ${pkg.description}`,
  ` * ${pkg.homepage}`,
  ' *',
  ` * @author ${pkg.author}`,
  ` * @license ${pkg.license}`,
  ' */',
  ''
].join('\n')

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'dist',
    filename: pkg.name.toLowerCase() + (argv.p ? '.min' : '') + '.js',
    library: pkg.name,
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'] }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner, { raw: true })
  ]
}
