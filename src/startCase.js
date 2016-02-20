module.exports = function (str) {
  return str.replace(/(^|[-\s])([a-z\u00C0-\u017F])/g, function ($0, $1, $2) {
    return $1 + $2.toUpperCase()
  })
}
