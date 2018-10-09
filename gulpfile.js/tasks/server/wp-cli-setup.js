var gulp                = require('gulp');
var shell               = require('gulp-shell');
var prompt              = require('gulp-prompt');

var config              = require('../../../workflow-config');

/**
 * local-wp-cli-setup   -   Installs WP-CLI onto all enviroments
 * *****************************************************************************
 */

/**
 * These tasks do the following:
 * 1. Installs wp-cli on local
 */

 gulp.task( 'local-wp-cli-setup', function() {
     return gulp.src( './*')
     .pipe(prompt.prompt({
         type: 'confirm',
         name: 'start',
         message: 'Are you ready to download WP-CLI to local'.bgRed.white
     }, function(res){
         if(res.start){
             console.log('Downloading WP-CLI to local environment'.red)
             gulp.start('local-wp-cli-setup-download');
         }
     }));
 });

// Download
gulp.task( 'local-wp-cli-setup-download', shell.task(
    'cd ../../../ && ' +
    'curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar'
));
