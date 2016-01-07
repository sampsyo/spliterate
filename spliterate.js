var remark = require('remark');
var visit = require('unist-util-visit');
var remove = require('unist-util-remove');

function spliterator(code_out) {
  // Our Remark "plugin".
  return function () {
    return function(ast, file) {
      visit(ast, 'code', function (node) {
        code_out.push(node.value);
        remove(ast, node);
      });
    };
  };
}

// Construct the plugin. We'll accumulate the code into `code_chunks` while
// stripping it out of the AST.
var code_chunks = [];
var plugin = spliterator(code_chunks);

// Process the document.
var processor = remark().use(plugin);
var doc = processor.process('hello\nfoo\n\n    bar\n\nbaz *qux*');

console.log(code_chunks);
console.log(doc);
