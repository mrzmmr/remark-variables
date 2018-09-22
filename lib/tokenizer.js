var xtend = require('xtend')

module.exports = tokenizer

function tokenizer (name, data, test) {
  var once = true

  return function (eat, value, silent) {
    var match = test.exec(value)
    var self = this
    var found
    var file
    var now

    file = self.file

    /**
     * Only merge data from the processor once
     */
    if (once) {
      file.data = xtend({}, file.data, data)
      once = false
    }

    if (match) {
      found = fromData(match[1], file)
      now = eat.now()

      /* istanbul ignore if */
      if (silent || (!found && found !== 0)) {
        return true
      }

      return eat(match[0])({
        type: name,
        children: self.tokenizeInline(found.toString(), now)
      })
    }
  }
}

function fromData (string, file) {
  var splitter = /\.|\[(\d+)\]/
  var value
  var keys
  var i

  function empty (value) {
    return value && value.length
  }

  i = -1
  value = file.data
  string = string.trim()
  keys = string.split(splitter).filter(empty)

  while (++i < keys.length) {
    val = value[keys[i]]
    if (val) {
      value = val
      continue
    } else {
      return null
    }
  }

  return value
}
