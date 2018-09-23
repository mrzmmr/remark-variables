var tokenizer = require('./lib/tokenizer')
var visitor = require('./lib/visitor')
var utils = require('./lib/utils')

module.exports = variables

function variables (options) {
  options = utils.settings(options)

  var self = this
  var parser = self.Parser
  var compiler = self.Compiler
  var data = self.data()

  var opening = options.fence[0]
  var name = options.name
  var test = options.test

  if (isParser(parser)) {
    attatchParser(
      name,
      parser,
      tokenizer(name, data, test),
      locator(opening)
    )
  }

  if (isCompiler(compiler)) {
    attatchCompiler(name, compiler, visitor(test))
  }
}

function attatchParser (name, parser, tokenizer, locator) {
  var proto = parser.prototype
  var tokenizers = proto.inlineTokenizers
  var methods = proto.inlineMethods

  tokenizer.locator = locator
  tokenizers[name] = tokenizer
  methods.splice(methods.indexOf('text'), 0, name)
}

function attatchCompiler (name, compiler, visitor) {
  compiler.prototype.visitors[name] = visitor
}

function locator (opening) {
  return function (value, fromIndex) {
    return value.indexOf(opening, fromIndex)
  }
}

function isParser (parser) {
  return Boolean(parser && parser.prototype && parser.prototype.inlineTokenizers)
}

function isCompiler (compiler) {
  return Boolean(compiler && compiler.prototype && compiler.prototype.visitors)
}
