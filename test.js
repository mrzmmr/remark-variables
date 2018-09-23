var unified = require('unified')
var parser = require('remark-parse')
var compiler = require('remark-stringify')
var test = require('tap').test
var variables = require('.')

test('variables', function (t) {
  t.doesNotThrow(function () {
    unified()
      .use(variables)
      .freeze()
  }, 'should not throw without parser')

  t.doesNotThrow(function () {
    t.ok(unified()
      .use(parser)
      .use(compiler)
      .use(variables)
    )
  }, 'should not throw without options')

  t.doesNotThrow(function() {
    var file = unified()
      .use(parser)
      .use(compiler)
      .use(variables)
      .processSync('{{ foo }}')

    t.ok(file.toString() === '{{ foo }}\n')
  }, 'should not throw when no data is found')

  t.doesNotThrow(function () {
    var file = unified()
      .use(parser)
      .use(compiler)
      .use(variables)
      .data('foo', 'bar')
      .processSync('{{ foo }}')
    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with default options')

  t.doesNotThrow(function () {
    var file = unified()
      .use(parser)
      .use(compiler)
      .use(variables, ':')
      .data('foo', 'bar')
      .processSync(': foo :')
    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with custom fence as string')

  t.doesNotThrow(function () {
    var file = unified()
      .use(parser)
      .use(compiler)
      .use(variables, [':'])
      .data('foo', 'bar')
      .processSync(': foo :')

    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with custom fence as an array.length = 1')

  t.doesNotThrow(function () {
    var file = unified()
      .use(parser)
      .use(compiler)
      .use(variables, ['->', '<-'])
      .data('foo', 'bar')
      .processSync('-> foo <-')

    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with custom fence as an array.length = 2')

  t.doesNotThrow(function () {
    var file = unified()
      .use(parser)
      .use(compiler)
      .use(variables, [false])
      .processSync('foo')

    t.ok(file.toString() === 'foo\n')
  }, 'should not throw and should resort to defaults with bad custom fence')

  t.doesNotThrow(function () {
    var file = unified()
      .use(parser)
      .use(compiler)
      .use(variables, { fence: ':' })
      .data('foo', 'bar')
      .processSync(': foo :')

    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with custom fence as an object')

  t.doesNotThrow(function () {
    var file = unified()
      .use(parser)
      .use(compiler)
      .use(variables, { fence: { open: '{{', close: '}}' } })
      .data('foo', 'bar')
      .processSync('{{ foo }}')

    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with custom fence as an object; open, close')

  t.doesNotThrow(function () {
    var file = unified()
      .use(parser)
      .use(compiler)
      .use(variables, { fence: { open: ':' } })
      .data('foo', 'bar')
      .processSync(': foo :')

    t.ok(file.toString() == 'bar\n')
  }, 'should not throw with custom fence as an object; open')

  t.doesNotThrow(function () {
    var file = unified()
      .use(parser)
      .use(compiler)
      .use(variables, { name: 'myVariables' })
      .data('foo', 'bar')
      .processSync('{{ foo }}')

    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with custom node type name')

  t.doesNotThrow(function () {
    var file = unified()
      .use(parser)
      .use(compiler)
      .use(variables, { test: /\:\:(.*?)\:\:/ })
      .data('foo', 'bar')
      .processSync('::foo::')

    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with using test regex')

  t.doesNotThrow(function () {
    var file = unified()
      .use(parser)
      .use(compiler)
      .use(variables)
      .use(function () {
        return function (tree, file) {
          file.data.foo = 'bar'
        }
      })
      .processSync('{{ foo }}')

    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with data from transform stage')

  t.end()
})
