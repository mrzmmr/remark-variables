var utils = require('./utils')

module.exports = tokenizer

function tokenizer (name, data, test) {
  return function (eat, value, silent) {
    var fromFile
    var fromData
    var found
    var match
    var file
    var self
    var add
    var now

    self = this
    file = self.file
    match = test.exec(value)

    if (match) {
      fromFile = utils.hasData(match[1], file.data)
      fromData = utils.hasData(match[1], data)
      found = fromFile || fromData
      now = eat.now()

      /* istanbul ignore if */
      if (silent) {
        return true
      }

      add = eat(match[0])

      if (found || found === 0) {
        return add({
          type: name,
          children: self.tokenizeInline(found.toString(), now)
        })
      }

      return add({
        type: name,
        value: match[0]
      })
    }
  }
}
