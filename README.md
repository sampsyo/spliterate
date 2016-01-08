Spliterate
==========

Spliterate is a disappointingly simple tool for literate programming using Markdown. You give it a Markdown file; it splits it into (a) a Markdown file with all the code blocks removed, and (b) a standalone file with just the code blocks' contents, stitched together.

It uses a real Markdown parser ([Remark][]), not just [the naive sed call][hn], so it should Kinda Work™.


Split It
--------

Install:

    npm install -g spliterate

Split:

    spliterate [-m out.md] [-c out.lang] in.md

By default, the tool will print the code contents to stdout. Use this mode if you just need to compile and execute the code from a Markdown document.

You can also use the `-c FILE` option to write the code contents to a file, and `-m FILE` to dump the code-free Markdown. If either or both of these is used, nothing is printed to stdout.


Author
------

This is by [Adrian Sampson][a]. The license is [MIT][].

[remark]: https://github.com/wooorm/remark
[hn]: https://news.ycombinator.com/item?id=5280306
[a]: http://adriansampson.net/
[mit]: http://choosealicense.com/licenses/mit/
