var gulp                = require('gulp');
var shell               = require('gulp-shell');
var runSequence         = require('run-sequence');
var prompt              = require('gulp-prompt');

var config              = require('../../../workflow-config');

/**
 * local-wp-cli-setup   -   Installs WP-CLI onto all enviroments
 * *****************************************************************************
 */

/**
 * These tasks do the following:
 * 1. Installs on local
 */

gulp.task('local-wp-cli-setup', () => {
    console.log('Add WP-CLI to local environment'.red)
    return gulp.src('*.js', {read: false})
    .pipe(shell([
        'cd ../../../ && curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar'
    ]))
});
