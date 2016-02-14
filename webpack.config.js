var path = require('path')

module.exports = {
  entry: {
    popup: "./src/popup.js",
    content: "./src/content.js"
  },
  output: {
    path: path.join(__dirname, 'scripts'),
    filename: '[name].js'
  }
}
