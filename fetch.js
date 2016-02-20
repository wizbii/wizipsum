var fs = require('fs')
var request = require('request')
var baseUrl = 'https://raw.githubusercontent.com/wizbii/wizipsum/gh-pages/public/data'
var data = {}

request.get(`${baseUrl}/index.json`, function (err, res, body) {
  if (err) return console.error(err)

  var list = JSON.parse(body)
  list.forEach(function (item) {
    request.get(`${baseUrl}/${item}.json`, function (err, res, body) {
      if (err) return console.error(err)

      data[item] = JSON.parse(body)

      if (Object.keys(data).length === list.length) {
        var fileContent = JSON.stringify(data, null, 2)
        fs.writeFile('./src/data.json', fileContent)
      }
    })
  })
})
