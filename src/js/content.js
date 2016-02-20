/* global chrome, CustomEvent */

chrome.runtime.onMessage.addListener(function (message) {
  if (message.origin === 'background') insert(message.value)
})

function insert (str) {
  // here, we're making sure that any new value
  // inserted is separated by a blank line from what
  // was the focused element's value before
  // by doing so, we're also removing any extra space before
  // and after the content
  var value = (document.activeElement.value || '') + '\n\n' + str
  document.activeElement.value = value.trim()

  // to trigger the usual behavior, we're faking
  // a bunch of events (e.g this way angular properly update its states)
  ;['input', 'change', 'keypress', 'keydown', 'keyup'].forEach(function (eventName) {
    var event = new CustomEvent(eventName)
    document.activeElement.dispatchEvent(event)
  })
}
