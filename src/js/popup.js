/* global chrome */

document.addEventListener('click', function (e) {
  if (e.target.tagName.toLowerCase() !== 'button') return

  var type = e.target.dataset.wizipsumType
  var nb = e.target.textContent.replace(/\s/g, '')

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { from: 'background', action: 'fill', type: type, nb: nb })
  })
}, false)
