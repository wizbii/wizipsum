/* global chrome, CustomEvent */

var wizipsum = require('wizipsum')

chrome.runtime.onMessage.addListener(function (message) {
  if (message.origin !== 'background') return

  var generator = wizipsum(message.args[0])

  if (message.name === 'title') insert(generator.title(1, ['', '']))
  else if (message.name === 'paragraph') insert(generator.paragraph(1, ['', ''], Number(message.args[1])))
  else insert(message.args[1])
})

function insert (str) {
  var value = (document.activeElement.value || '') + '\n\n' + str
  document.activeElement.value = value.trim()

  ;['input', 'change', 'keypress', 'keydown', 'keyup'].forEach(function (eventName) {
    var event = new CustomEvent(eventName)
    document.activeElement.dispatchEvent(event)
  })
}
