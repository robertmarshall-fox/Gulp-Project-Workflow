var gulp                = require('gulp');
var GulpSSH             = require('gulp-ssh');

var config              = require('../../../workflow-config');

/**
 * 1. check wp-cli exists
 * 2. check managewp thing exists
 * 3. find staging server details
 * 4. push database & media
 * 5. show progress?
 */

/**
 * git-stage    -     Pull to staging from build
 * *****************************************************************************
 */

/**

 var gulpSSH = new GulpSSH({
   ignoreErrors: false,
   sshConfig: config.sslConfig
 })

 gulp.task( 'git-stage', function() {
     if( config.packageJson && config.packageJson.repository.url ){
         console.log('Push project to staging server');
         runSequence(
             'git-ssh-exec',
         );
     }
 });


gulp.task( 'git-ssh-exec', function() {
    return gulpSSH
        .exec(['uptime', 'ls -a', 'pwd'], {filePath: 'commands.log'})
        .pipe(gulp.dest('logs'))
});

**/
