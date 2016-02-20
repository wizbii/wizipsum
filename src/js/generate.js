var wizipsum = require('wizipsum')

module.exports = function (name, data, arg) {
  var generator = wizipsum(data)

  if (name === 'title') return generator.title(1, ['', ''])
  if (name === 'paragraph') return generator.paragraph(1, ['', ''], Number(arg))
  return arg
}
