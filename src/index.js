const sample = require('lodash/sample')

module.exports = function (data, paragraphs = 1, wrappers = ['', '\n'], maxlength = 400) {
  const defaults = { maxlength, paragraphs, wrappers }

  return function (paragraphs = defaults.paragraphs, wrappers = defaults.wrappers, maxlength = defaults.maxlength) {
    const content = []

    for (let i = 0; i < paragraphs; i++) {
      let str = ''

      // -1 is accounting for the white space
      while ((str.length - 1) < maxlength) str += sample(data) + ' '
      content.push(str.trim())
    }

    return content.map((str) => wrappers[0] + str + wrappers[1]).join('')
  }
}
