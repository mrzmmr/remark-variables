var remark = require('remark')
var test = require('tap').test
var variables = require('.')
var match = require('./lib/match')

test('variables', function (t) {
  t.doesNotThrow(function () {
    remark()
      .use(variables)
      .freeze()
  }, 'should not throw without parser')

  t.doesNotThrow(function () {
    t.ok(remark().use(variables))
  }, 'should not throw without options')

  t.doesNotThrow(function() {
    var file = remark()
      .use(variables)
      .processSync('{{ foo }}')

    t.ok(file.toString() === '{{ foo }}\n')
  }, 'should not throw when no data is found')

  t.doesNotThrow(function () {
    var file = remark()
      .use(variables)
      .data('foo', 'bar')
      .processSync('{{ foo }}')
    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with default options')

  t.doesNotThrow(function () {
    var file = remark()
      .use(variables, ':')
      .data('foo', 'bar')
      .processSync(': foo :')
    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with custom fence as string')

  t.doesNotThrow(function () {
    var file = remark()
      .use(variables, [':'])
      .data('foo', 'bar')
      .processSync(': foo :')

    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with custom fence as an array.length = 1')

  t.doesNotThrow(function () {
    var file = remark()
      .use(variables, ['->', '<-'])
      .data('foo', 'bar')
      .processSync('-> foo <-')

    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with custom fence as an array.length = 2')

  t.doesNotThrow(function () {
    var file = remark()
      .use(variables, [false])
      .processSync('foo')

    t.ok(file.toString() === 'foo\n')
  }, 'should not throw and should resort to defaults with bad custom fence')

  t.doesNotThrow(function () {
    var file = remark()
      .use(variables, { fence: ':' })
      .data('foo', 'bar')
      .processSync(': foo :')

    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with custom fence as an object')

  t.doesNotThrow(function () {
    var file = remark()
      .use(variables, { fence: { open: '{{', close: '}}' } })
      .data('foo', 'bar')
      .processSync('{{ foo }}')

    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with custom fence as an object; open, close')

  t.doesNotThrow(function () {
    var file = remark()
      .use(variables, { fence: { open: ':' } })
      .data('foo', 'bar')
      .processSync(': foo :')

    t.ok(file.toString() == 'bar\n')
  }, 'should not throw with custom fence as an object; open')

  t.doesNotThrow(function () {
    var file = remark()
      .use(variables, { name: 'myVariables' })
      .data('foo', 'bar')
      .processSync('{{ foo }}')

    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with custom node type name')

  t.doesNotThrow(function () {
    var file = remark()
      .use(variables)
      .use(function () {
        return function (tree, file) {
          file.data.foo = 'bar'
        }
      })
      .processSync('{{ foo }}')

    t.ok(file.toString() === 'bar\n')
  }, 'should not throw with data from transform stage')

  t.doesNotThrow(function () {
    var file = remark()
      .use(variables)
      .data('foo', 0)
      .processSync('{{ .foo }}')

    t.ok(file.toString() === '0\n')

    var file = remark()
      .use(variables)
      .data('foo', false)
      .processSync('{{ foo }}')

    t.ok(file.toString() === 'false\n')
  }, 'should not throw and match when data value is zero or false')

  t.throws(function () {
    remark()
      .use(variables, { fail: true })
      .processSync('{{ foo }}')
  })

  t.doesNotThrow(function () {
    var file = remark()
      .use(variables)
      .processSync('{{ .foo }}')

    t.ok(file.messages[0].message === 'Could not resolve `data' + sub + '` in VFile or Processor.')
  }, 'should not throw and should create message')

  t.doesNotThrow(function () {
    var file = remark()
      .use(variables, { quiet: true })
      .processSync('{{ .foo }}')

    t.ok(file.messages.length === 0)
  }, 'should not throw and no messages with quiet option')

  t.doesNotThrow(function () {
    remark()
      .use(function () {
        this.Parser = function () {
          return {
            type: 'root',
            children: []
          }
        }
      })
      .use(variables)
      .processSync('{{ .foo }}')
  }, 'should do nothing if is not a remark parser.')

  t.doesNotThrow(function () {
    remark()
      .use(function () {
        this.Compiler = function () {
          return ''
        }
      })
      .use(variables)
      .processSync('{{ .foo }}')
  }, 'should do nothing if is not a remark compiler.')

  t.end()
})


test('Match function', t => {
  t.doesNotThrow(() => {
    t.ok(match('') == null, 'should return undefined with no fence.')
    t.ok(match('[foo]', [':', ':']) == null, 'should return undefined with no match.')
    t.ok(match('[ foo [', ['[', ']']) == null, 'should return undefined with no closing match.')
    t.deepEqual(match('[foo]', ['[', ']']), ['[foo]', 'foo'], 'should match fence.')
    t.deepEqual(match(': foo :', [':', ':']), [': foo :', 'foo'], 'should match same markers fence.')
    t.deepEqual(
      match('[ foo ] [bar]', ['[', ']']),
      ['[ foo ]', 'foo'],
      'should match first occurence only.'
    )
    t.deepEqual(
      match('[ foo[0] ]', ['[', ']']),
      ['[ foo[0] ]', 'foo[0]'],
      'should match outer fence.'
    )
  })
  t.end()
})

