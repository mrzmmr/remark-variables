# remark-variables

[![Travis](https://img.shields.io/travis/mrzmmr/remark-variables.svg)](https://travis-ci.org/mrzmmr/remark-variables)
[![Coverage
Status](https://coveralls.io/repos/github/mrzmmr/remark-variables/badge.svg?branch=master)](https://coveralls.io/github/mrzmmr/remark-variables?branch=master)

This plugin adds variables support to [remark](https://github.com/remarkjs/remark) using a customizable template syntax. Variables are checked against both the [vfile](https://github.com/vfile/vfile#vfiledata)'s, and [processor](https://github.com/unifiedjs/unified#processordatakey-value)'s **[data](https://github.com/vfile/vfile#vfiledata)** property and can use both dot and bracket syntax. For example, `foo.bar[0]` resolve to `vfile.data.foo.bar[0]` if it exists, or do nothing if the property does not exist. By default, this plugin uses double curly braces `{{`, `}}` to denote variables but can be configured.

## Install

```
npm install --save remark-variables
```

## Usage

If we have a file, example.md

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
var reporter = require('vfile-reporter')
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

the output would be

```
./example.md: no issues found
# Example

-   other text (string)
-   0 (number)
-   true (boolean)

> Variables in markdown!
```

### Options

Type: `Object` | `Array` | `String`

If options is a string, then it is used as the opening and closing fence markers, for example: `.use(variables, ':')` would match `:some.variable[0]:` look for `vfile.data.some.variable[0]`. If options is an array, options[0] and options[1] are used as fence markers.

#### fence

Type: `Array`

Default: [ '{{', '}}' ]

Markers used to denote a variable to be replaced.

## License

MIT &copy; Paul Zimmer
