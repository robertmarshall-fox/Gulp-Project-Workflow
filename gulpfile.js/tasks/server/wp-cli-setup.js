var gulp                = require('gulp');
var shell               = require('gulp-shell');
var runSequence         = require('run-sequence');
var GulpSSH             = require('gulp-ssh');
var prompt              = require('gulp-prompt');

var config              = require('../../../workflow-config');

/**
 * install-wp-cli-all-enviro   -   Installs WP-CLI onto all enviroments
 * *****************************************************************************
 */

/**
 * These tasks do the following:
 * 1. Installs on local
 * 2. Installs on stage
 * 3. Installs on live
 */

gulp.task( 'install-wp-cli-all-enviro', function() {
    prompt.prompt({
        type: 'confirm',
        name: 'start',
        message: 'Have all workflow config details been added?'.bgRed.white
    }, function(res){
        if(res.start){
            runSequence(
                'local-wp-cli-setup',
                'stage-wp-cli-setup',
                'live-wp-cli-setup'
            );
        }
    });
});

gulp.task('local-wp-cli-setup', () => {
    console.log('Add WP-CLI to local environment'.red)
    return gulp.src('*.js', {read: false})
    .pipe(shell([
        'cd ../../../ && curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar'
    ]))
});


// Download WP-CLI to stage environment
gulp.task( 'stage-wp-cli-setup', function(cb) {

    console.log('Logging into stage server...'.red);

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

    console.log('Logging into live server...'.red);

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
