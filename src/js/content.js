/* global chrome, CustomEvent */

var wizipsum = require('wizipsum')

chrome.runtime.onMessage.addListener(function (message) {
  if (message.from === 'background' && message.action === 'fill') {
    var generator = wizipsum(message.data)
    var type = message.type
    var nb = message.nb

    document.activeElement.value =
      type === 'word'
        ? generator.word(nb)
        : type === 'sentence'
          ? generator.sentence(nb)
          : generator.paragraph(nb)

    ;['input', 'change', 'keypress', 'keydown', 'keyup'].forEach(function (eventName) {
      var event = new CustomEvent(eventName)
      document.activeElement.dispatchEvent(event)
    })
  }
})
