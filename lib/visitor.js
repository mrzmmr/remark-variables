var utils = require('./utils')

module.exports = visitor

function visitor (test) {
  return function (node) {
    var file = this.file
    var match
    var found

    if (node.children) {
      return this.all(node).join('')
    }

    match = test.exec(node.value)
    found = utils.hasData(match[1], file.data)

    if (found || found === 0) {
      return found
    }

    return node.value
  }
}
