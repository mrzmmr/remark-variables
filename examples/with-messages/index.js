var remark = require('remark')
var reporter = require('vfile-reporter')
var variables = require('../../')

var markdown = `
# {{ title }}

> {{ subtitle }}
`

remark()
  .use(variables)
  .data('title', 'Example with messages')
  .process(markdown, function (err, file) {
    console.error(reporter(err || file))
    console.log(String(file))
  })
