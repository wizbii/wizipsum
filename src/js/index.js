const wizipsum = require('wizipsum')
const xhr = require('./xhr')
const defaultName = 'wizbii'
const range = document.querySelector('[type=range]')
const output = document.getElementById('output')
const dataName = document.getElementById('data-name')
let generator

range.addEventListener('input', function (e) {
  const nb = Number(e.target.value)
  setParagraphs(nb)
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
      setParagraphs(1)
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

    dataName.innerHTML = name
    generator = wizipsum(result)
    window.location.hash = name

    onSuccess(result)
  })
}
