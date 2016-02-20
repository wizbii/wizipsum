/* global chrome */

var data = require('../data.json')
var storage = require('./storage')
var currentData = []
var select = document.querySelector('select')
var editableValues = [].slice.call(document.querySelectorAll('.editable__value'))

for (var name in data) {
  if (!data.hasOwnProperty(name)) continue

  var option = document.createElement('option')
  option.value = name
  option.textContent = name

  select.appendChild(option)
}

select.addEventListener('change', function () {
  selectData(select.value)
}, false)

document.addEventListener('click', function (e) {
  var target = e.target
  if (target.tagName.toLowerCase() !== 'button') return

  var name = target.textContent.trim().toLowerCase()
  var args = [currentData]

  var editableValue = target.parentElement.querySelector('.editable__value')
  if (editableValue) args.push(editableValue.textContent.trim())

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { origin: 'background', name: name, args: args })
  })
}, false)

editableValues.forEach(function (editableValue) {
  var key = editableValue.parentElement.parentElement.querySelector('button').textContent.trim().toLowerCase()
  var value = storage.get(key)
  if (value) editableValue.textContent = value

  editableValue.addEventListener('input', function () {
    var value = editableValue.textContent.trim()
    storage.save(key, value)
  }, false)
})

selectData('wizbii')

function selectData (name) {
  select.value = name
  currentData = data[name]
}
