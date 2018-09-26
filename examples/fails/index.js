var remark = require('remark')
var reporter = require('vfile-reporter')
var variables = require('../../')

var markdown = `
# {{ .title }}
`

remark()
  .use(variables, { fail: true })
  .process(markdown, function (err, file) {
    console.error(reporter(err || file))
    console.log('vfile == null? %s', file == null)
  })
