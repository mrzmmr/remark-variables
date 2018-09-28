var remark = require('remark')
var rehype = require('remark-rehype')
var format = require('rehype-format')
var document = require('rehype-document')
var stringify = require('rehype-stringify')
var reporter = require('vfile-reporter')
var variables = require('../../')

var markdown = `
# [.title]

> Some bold text __[.foo]__.
`

remark()
  .use(variables, ['[', ']'])
  .use(rehype)
  .use(document)
  .use(format)
  .use(stringify)
  .data('title', 'Example bridging to rehype')
  .data('foo', 'here')
  .process(markdown, function (err, file) {
    console.error(reporter(err || file))
    console.log(String(file))
  })
