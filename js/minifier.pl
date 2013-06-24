#!/usr/bin/env perl
use JavaScript::Minifier qw(minify);
system("coffee -bc logics.coffee");
open(INFILE, 'logics.js') or die;
open(OUTFILE, '>logics-min.js') or die;
minify(input => *INFILE, outfile => *OUTFILE);
close(INFILE);
close(OUTFILE);
