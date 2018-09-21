module.exports = settings

/**
 * TODO: Refactor / rewrite, this function feels clunky and kind of
 * awkward.
 */
function settings (options) {
  options = options || {}

  var fence = fences(options)
  var name = options.name || 'variables'
  var test = RegExp(fence[0] + '(.*?)' + fence[1])

  return {
    fence: fence,
    name: name,
    test: test
  }
}

function fences (value) {
  var defaults = [ '{{', '}}' ]
  var fence

  if (value && value.fence) {
    return fences(value.fence)
  }

  if (Array.isArray(value) && value.length) {
    return [ value[0], value[1] || value[0] ]
  } else if (typeof value === 'string') {
    return [ value, value ]
  } else if (value && value.open) {
    return [ value.open, value.close || value.open ]
  }

  return defaults
}
