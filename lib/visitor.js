/**
 * Compile how paragraphs compile.
 * - https://github.com/remarkjs/remark/blob/master/packages/remark-stringify/lib/macro/all.js
 * - https://github.com/remarkjs/remark/blob/master/packages/remark-stringify/lib/visitors/paragraph.js
 */
module.exports = visitor

function visitor (node) {
  return this.all(node).join('')
}
