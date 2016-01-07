var remark = require('remark');
var visit = require('unist-util-visit');
var remove = require('unist-util-remove');

var processor = remark().use(function () {
  return function(ast, file) {
    visit(ast, 'code', function (node) {
      console.log(node.value);
      remove(ast, node);
    });
  };
});
var doc = processor.process('hello\nfoo\n\n    bar\n\nbaz *qux*');
console.log('---');
console.log(doc);
