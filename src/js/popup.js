/* global chrome */

var xhr = require('./xhr')
var select = document.getElementById('name')
var loading = document.getElementById('loading')
var notLoading = document.getElementById('not-loading')

;(function getList (callback) {
  xhr.get('https://wizbii.github.io/wizipsum/public/data/index.json', function (err, list) {
    if (err) return getList(callback)

    list.forEach(function (item) {
      var option = document.createElement('option')

      option.value = item
      option.textContent = item

      select.appendChild(option)
    })

    callback()
  })
})(function () {
  var data

  selectData('wizbii')

  function selectData (name) {
    loading.style.display = 'block'
    notLoading.style.display = 'none'

    xhr.get('https://wizbii.github.io/wizipsum/public/data/' + name + '.json', function (err, result) {
      if (err) return selectData('wizbii')

      data = result
      if (select.value !== name) select.value = name

      loading.style.display = 'none'
      notLoading.style.display = 'block'
    })
  }

  select.addEventListener('change', function (e) {
    selectData(e.target.value)
  }, false)

  document.addEventListener('click', function (e) {
    if (e.target.tagName.toLowerCase() !== 'button') return

    if (data == null) return window.alert('Please wait a little bit while the data is being fetched.')
    if (data === 'err') return window.alert('Oops, couldn\'t fetch data.')

    var type = e.target.dataset.wizipsumType
    var nb = e.target.textContent.replace(/\s/g, '')

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { from: 'background', action: 'fill', type: type, nb: nb, data: data })
    })
  }, false)
})
