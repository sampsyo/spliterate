#!/usr/bin/env node
'use strict';

var remark = require('remark');
var visit = require('unist-util-visit');
var remove = require('unist-util-remove');
var program = require('commander');
var fs = require('fs');

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

program
  .usage('[options] <file>')
  .option('-m --markdown <file>', 'markdown output file')
  .option('-c --code <file>', 'code output file')
  .parse(process.argv);

// Get the input document.
var infile = program.args[0];
if (!infile) {
  program.help();
}

var indoc = fs.readFile(infile, function (err, data) {
  if (err)
    throw err;
  var indoc = data.toString();

  // Process the document.
  var processor = remark().use(plugin);
  var markdown = processor.process(indoc);
  var code = code_chunks.join('\n') + '\n';

  // Output Markdown.
  if (program.markdown) {
    fs.writeFileSync(program.markdown, markdown);
  }

  // Output extracted code.
  if (program.code) {
    fs.writeFileSync(program.code, code);
  }

  // If neither is specified, just dump the code to stdout.
  if (!program.markdown && !program.code) {
    process.stdout.write(code);
  }
});
