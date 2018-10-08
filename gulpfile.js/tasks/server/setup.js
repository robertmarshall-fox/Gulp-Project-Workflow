var gulp                = require('gulp');
var shell               = require('gulp-shell');

var GulpSSH             = require('gulp-ssh');

var config              = require('../../../workflow-config');

/**
 * 1. setup local wp-cli
 */

// Download WP-CLI to local environment

gulp.task('local-wp-cli-setup', () => {
    console.log('Add WP-CLI to local environment'.red)
    return gulp.src('*.js', {read: false})
    .pipe(shell([
        'cd ../../../ && curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar'
    ]))
});


// Download WP-CLI to stage environment
gulp.task( 'stage-wp-cli-setup', function(cb) {

    // Create object for stage
    var stageSSH = new GulpSSH({
        ignoreErrors: false,
        sshConfig: config.staging.sslConfig
    });

    console.log('Add WP-CLI to stage environment'.red);
    // Move into the public dir and download wp-cli
    return stageSSH
      .shell('cd public_html && curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar', {filePath: 'shell.log'})
      .pipe(gulp.dest('./'));
});



// Download WP-CLI to live environment
gulp.task( 'live-wp-cli-setup', function(cb) {

    // Create object for stage
    var liveSSH = new GulpSSH({
        ignoreErrors: false,
        sshConfig: config.live.sslConfig
    });

    console.log('Add WP-CLI to live environment'.red);
    // Move into the public dir and download wp-cli
    return liveSSH
      .shell('cd public_html && curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar', {filePath: 'shell.log'})
      .pipe(gulp.dest('./'));
});
