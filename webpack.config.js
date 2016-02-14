module.exports = {
  entry: './src/js/index.js',
  output: {
    path: 'public/js',
    filename: 'app.min.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'] },
      { test: /\.json$/, loaders: ['json-loader'] }
    ]
  }
}
