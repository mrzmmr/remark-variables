var remark = require('remark')
var reporter = require('vfile-reporter')
var frontmatter = require('remark-frontmatter')
var extract = require('remark-extract-frontmatter')
var yaml = require('yaml').parse
var variables = require('../../')

var markdown = `
---
title: Example using vfile's data property
---

{{ .title }}

> {{ .subtitle }}
`

remark()
  .use(frontmatter)
  .use(extract, yaml)
  .use(variables)
  .process(markdown, function (err, file) {
    console.error(reporter(err || file))
    console.log(String(file))
  })
