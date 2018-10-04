var remark = require('remark')
var reporter = require('vfile-reporter')
var variables = require('../../')

var markdown = `
# [.title]

> [.subtitle[0]]
`

remark()
  .use(variables, ['[', ']'])
  .data('title', 'Example with custom markers')
  .data('subtitle', ['here'])
  .process(markdown, function (err, file) {
    console.error(reporter(err || file))
    console.log(String(file))
  })
