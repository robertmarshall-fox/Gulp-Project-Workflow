var gulp                = require('gulp');
var download            = require("gulp-download");

var exec                = require('child_process').exec;

/**
 * 1. setup local wp-cli
 */



 gulp.task( 'local-wp-cli-setup', function(cb) {
    console.log('Add WP-CLI to local dev'.red);
    download('https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar')
     .pipe(gulp.dest('../../../'));
 });
