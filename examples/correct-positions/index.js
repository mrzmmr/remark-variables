var remark = require('remark')
var reporter = require('vfile-reporter')
var styleGuide = require('remark-preset-lint-markdown-style-guide')
var variables = require('../../')

var markdown = `
# {{ title }}

> Should have correct positional information: __{{ marker }}__.
> and {{ inline }}.
`

remark()
.use(styleGuide)
.use(variables)
.data('title', 'Correct positional information')
.data('inline', '__here__')
.data('marker', 'here')
.process(markdown, function (err, file) {
  console.error(reporter(err || file))
  console.log(file.toString())
})
