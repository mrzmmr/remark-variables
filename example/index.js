var unified = require('unified')
var parser = require('remark-parse')
var compiler = require('remark-stringify')
var reporter = require('vfile-reporter')
var toVfile = require('to-vfile')
var variables = require('..')

var markdown = toVfile.readSync('./example.md')

/**
 * Set the processor
 */
var processor = unified()
  .use(parser)
  .use(compiler)
  .use(variables)

/**
 * Set some data
 */
processor = processor() 
  .data('title', 'Example')
  .data('subtitle', 'Variables in markdown!')
  .data('list', [ 'other text', 0, true ])

/**
 * And process
 */
processor().process(markdown, function (err, file) {
  console.error(reporter(err || file))
  console.log(file.toString())
})
