const random = require('lodash/random')
const sample = require('lodash/sample')
const startCase = require('lodash/startCase')

function pickNSplice (origin) {
  let ar = []

  return function () {
    if (ar.length === 0) ar = origin.slice()

    const index = random(0, ar.length - 1)
    return ar.splice(index, 1)[0]
  }
}

module.exports = function (strs) {
  function paragraph (nb = 1, wrappers = ['', '\n\n'], averageLength = 400) {
    const result = []
    const picker = pickNSplice(data())

    for (let i = 0; i < nb; i++) {
      let str = ''
      while (str.length < averageLength) str += `${picker()} `
      result.push(str.trim())
    }

    return wrap(result, wrappers)
  }

  function sentence (nb = 1, wrappers = ['', ' ']) {
    const result = []
    const picker = pickNSplice(data())

    for (let i = 0; i < nb; i++) {
      result.push(picker())
    }

    return wrap(result, wrappers)
  }

  function title (nb = 1, wrappers = ['', '']) {
    return startCase(sentence(nb, wrappers))
  }

  function word (nb = 1, wrappers = ['', ' ']) {
    const result = []
    const picker = pickNSplice(data())

    for (let i = 0; i < nb; i++) {
      const randomStr = picker()
      const words = randomStr.split(' ')
      const word = sample(words).toLowerCase().replace(/[^-a-z0-9]/g, '')

      result.push(word)
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

  return { paragraph, sentence, title, word, data }
}
