module.exports = {
  save: function save (key, value) {
    try {
      localStorage.setItem(key, value)
    } catch (e) {}
  },

  get: function get (key) {
    try {
      return localStorage.getItem(key)
    } catch (e) {
      return null
    }
  }
}
