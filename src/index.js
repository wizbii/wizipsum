const sample = require('lodash/sample')

module.exports = function (strs) {
  function paragraph (nb = 1, wrappers = ['', '\n'], averageLength = 400) {
    const result = []

    for (let i = 0; i < nb; i++) {
      let str = ''
      while (str.length < averageLength) str += `${sample(data())} `
      result.push(str.trim())
    }

    return wrap(result, wrappers)
  }

  function sentence (nb = 1, wrappers = ['', '\n']) {
    const result = []

    for (let i = 0; i < nb; i++) {
      result.push(sample(data()))
    }

    return wrap(result, wrappers)
  }

  function word (nb = 1, wrappers = ['', ' ']) {
    const result = []

    for (let i = 0; i < nb; i++) {
      const randomStr = sample(data())
      const words = randomStr.split(' ')

      result.push(sample(words))
    }

    return wrap(result, wrappers)
  }

  function data () {
    if (arguments.length > 0) strs = arguments[0]
    return strs
  }

  function wrap (result, wrappers) {
    return result.map((str) => wrappers[0] + str + wrappers[1]).join('')
  }

  return { paragraph, sentence, word, data }
}
