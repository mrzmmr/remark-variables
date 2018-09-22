# remark-variables

## Install

```
npm install --save remark-variables
```

## Usage

This plugin adds variables support to [remark](https://github.com/remarkjs/remark) using a customizable template syntax. Variables are checked against both the [vfile](https://github.com/vfile/vfile#vfiledata)'s, and [processor](https://github.com/unifiedjs/unified#processordatakey-value)'s **[data](https://github.com/vfile/vfile#vfiledata)** property and can use both dot and bracket syntax. For example, `foo.bar[0]` resolve to `vfile.data.foo.bar[0]` if it exists, or do nothing if the property does not exist. By default, this plugin uses double curly braces `{{`, `}}` to denote variables but can be configured.

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
