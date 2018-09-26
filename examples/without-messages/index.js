var remark = require('remark')
var reporter = require('vfile-reporter')
var variables = require('../../')

var markdown = `
# {{ .title }}

> {{ .subtitle }}
`

remark()
  .use(variables, { quiet: true })
  .data('title', 'Example using quiet option')
  .process(markdown, function (err, file) {
    console.error(reporter(err || file))
    console.log(String(file))
  })
