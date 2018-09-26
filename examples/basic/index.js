var remark = require('remark')
var reporter = require('vfile-reporter')
var variables = require('../../')

var markdown = `
# {{ .title }}

- {{ .list[0] }} (string)
- {{ .list[1] }} (number)
- {{ .list[2] }} (boolean)
`

remark()
  .use(variables)
  .data('title', 'Example')
  .data('list', ['Markdown', 0, false])
  .process(markdown, function (err, file) {
    console.error(reporter(err || file))
    console.log(String(file))
  })
