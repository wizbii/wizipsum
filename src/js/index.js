const wizipsum = require('wizipsum')
const data = require('../data.json')

const sources = Object.keys(data)

const select = document.querySelector('select')
const range = document.querySelector('[type=range]')
const output = document.getElementById('output')

let generator

// add an option for each data source available
sources.forEach(function (item) {
  const option = document.createElement('option')

  option.value = item
  option.textContent = item

  // the last element is the "add yours" option
  // which we want to keep last
  select.insertBefore(option, select.lastElementChild)
})

// update the number of pragraphs displayed
// according to the range input's value
range.addEventListener('input', () => setParagraphs(range.value), false)

select.addEventListener('change', function () {
  const source = select.value

  // if user selected the "add yours" option
  // then redirect him to the documentation on how to do so
  if (source === 'diy') {
    window.location.href = 'https://github.com/wizbii/wizipsum/tree/gh-pages#add-yours'
    return
  }

  selectDataSource(source)
}, false)

// on page load, get source from hash
selectDataSource(window.location.hash.substr(1))

function selectDataSource (name) {
  if (!data.hasOwnProperty(name)) name = 'wizbii'

  select.value = name
  window.location.hash = name
  generator = wizipsum(data[name])

  // when the source changes
  // update the displayed paragraphs
  setParagraphs(range.value)
}

function setParagraphs (nb) {
  range.value = nb
  output.innerHTML = generator.paragraph(Number(nb), ['<p>', '</p>'])
}
