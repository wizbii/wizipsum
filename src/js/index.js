const wizipsum = require('wizipsum')
const xhr = require('./xhr')
const list = require('../../public/data/index.json')
const defaultName = 'wizbii'
const range = document.querySelector('[type=range]')
const output = document.getElementById('output')
const dataName = document.getElementById('data-name')
let generator

list.forEach(function (item) {
  const option = document.createElement('option')
  option.value = item
  option.textContent = item
  dataName.insertBefore(option, dataName.lastElementChild)
})

range.addEventListener('input', function (e) {
  const nb = Number(e.target.value)
  setParagraphs(nb)
}, false)

dataName.addEventListener('change', function (e) {
  const value = e.target.value

  if (value === 'diy') {
    window.location.href = 'https://github.com/wizbii/wizipsum/tree/gh-pages#add-yours'
    return
  }

  selectData(value)
}, false)

let attempts = 0
;(function getData (name = window.location.hash.substr(1) || defaultName) {
  selectData(
    name,
    function () {
      if (attempts++ > 4) return window.alert('Oops, couldn\'t fetch data. Are you connected to internet? If so, please try refreshing the page.')
      getData(defaultName)
    },
    function () {
      setParagraphs(2)
      setTimeout(() => document.body.classList.add('enter-animation'), 0)
    }
  )
})()

function setParagraphs (nb) {
  if (range.value !== String(nb)) range.value = nb
  output.innerHTML = generator.paragraph(nb, ['<p>', '</p>'])
}

function selectData (name, onError = () => {}, onSuccess = () => {}) {
  const url = `public/data/${name}.json`

  xhr.get(url, function (err, result) {
    if (err) {
      onError(err)
      return
    }

    dataName.value = name
    generator = wizipsum(result)
    window.location.hash = name
    setParagraphs(1)

    onSuccess(result)
  })
}
