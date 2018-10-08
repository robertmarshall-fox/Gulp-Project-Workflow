var gulp                = require('gulp');
var fs                  = require('fs');
var GulpSSH             = require('gulp-ssh');

var config              = require('../../../workflow-config');

/**
 * git-stage    -     Pull to staging from build
 * *****************************************************************************
 */

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
