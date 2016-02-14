const cache = {}

function get (url, callback) {
  if (cache.hasOwnProperty(url)) {
    callback(null, cache[url])
    return
  }

  const req = new window.XMLHttpRequest()
  req.open('GET', url, true)

  req.onreadystatechange = function () {
    if (req.readyState !== 4) return

    if (req.status !== 200) {
      callback({ status: req.status })
      return
    }

    const data = JSON.parse(req.responseText)
    cache[url] = data

    callback(null, data)
  }

  req.send(null)
}

module.exports = { get }
