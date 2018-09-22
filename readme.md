# remark-variables

## Install

```
npm install --save remark-variables
```

## Usage

This plugin will check the vfile, and processor's data properties for values. For example if we have a markdown file, example.md

```
# {{ title }}

- {{ list[0] }} (string)
- {{ list[1] }} (number)
- {{ list[2] }} (boolean)

> {{ subtitle }}
```
and

```js
var unified = require('unified')
var parser = require('remark-parse')
var compiler = require('remark-stringify')
var variables = require('remark-variables')
var reporter = requir('vfile-reporter')
var toVfile = require('to-vfile')

var markdown = toVfile('./example.md')

// Set the processor
var processor = unified()
  .use(parser)
  .use(compiler)
  .use(variables)

// Add some data
processor = processor()
  .data('title', 'Example')
  .data('subtitle', 'Variables in markdown!')
  .data('list', [ 'other text', 0, true ])

// And process
processor().process(markdown, function (err, file) {
  console.error(reporter(err || file))
  console.log(file.toString())
})
```

would output

```
./example.md: no issues found
# Example

-   other text (string)
-   0 (number)
-   true (boolean)

> Variables in markdown!
```

## License

MIT &copy; Paul Zimmer
