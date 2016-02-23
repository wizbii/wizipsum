/* global chrome */

var data = require('../data.json')
var generate = require('./generate')
var storage = require('./storage')

var currentData = []

var select = document.querySelector('select')
var editableValues = [].slice.call(document.querySelectorAll('.editable__value'))
var copyCheckbox = document.getElementById('copy')

// this is actually a hidden textarea used to
// copy text to the clipboard
var clipboard = document.getElementById('clipboard')

// add an option for each data available
for (var name in data) {
  if (!data.hasOwnProperty(name)) continue

  var option = document.createElement('option')
  option.value = name
  option.textContent = name

  select.appendChild(option)
}

// when a data set is selected, update it
select.addEventListener('change', function () {
  selectData(select.value)
}, false)

// delegating click events
document.addEventListener('click', function (e) {
  var target = e.target

  // we're actually just delegating buttons click events
  if (target.tagName.toLowerCase() !== 'button') return

  // get the name of the button
  var name = target.textContent.trim().toLowerCase()

  // we'll always pass the currentData
  var args = [currentData]

  // get the editable value to be passed as second argument
  var editableValue = target.parentElement.querySelector('.editable__value')
  if (editableValue) args.push(editableValue.textContent.trim())

  var value = generate(name, args[0], args[1])

  // if the copy to clipboard checkbox is checked
  // then, copy to clipboard...
  if (copyCheckbox.checked) {
    try {
      clipboard.value = value
      clipboard.select()
      document.execCommand('copy')
    } catch (e) {}
  }

  // send a message to the content script
  // so it adds the value to the focused input
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { origin: 'background', value: value })
  })
}, false)

editableValues.forEach(function (editableValue) {
  var key = editableValue.parentElement.parentElement.querySelector('button').textContent.trim().toLowerCase()

  // for each editable values,
  // init its content with comes from localStorage if available
  var value = storage.get(key)
  if (value) editableValue.textContent = value

  // when its value change, update the stored data
  editableValue.addEventListener('input', function () {
    var value = editableValue.textContent.trim()
    storage.save(key, value)
  }, false)
})

// when the copy to clipboard checked state changes,
// store its value in localStorage to preserve its state
// next time the popup is opened
copyCheckbox.addEventListener('change', function () {
  storage.save('__copy', copyCheckbox.checked)
}, false)

// init the checkbox with what we had in localStorage
copyCheckbox.checked = storage.get('__copy') !== 'false'

// by default, select some data
selectData('programmers')

// change the currentData value and ensure
// that the select has the right option selected
function selectData (name) {
  select.value = name
  currentData = data[name]
}
