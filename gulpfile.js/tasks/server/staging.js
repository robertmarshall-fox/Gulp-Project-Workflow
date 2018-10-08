var gulp                = require('gulp');
var shell               = require('gulp-shell');
var GulpSSH             = require('gulp-ssh');
var prompt              = require('gulp-prompt');

var config              = require('../../../workflow-config');


/**
 * git-stage   -   Pull files from staging branch
 * *****************************************************************************
 */

 gulp.task( 'git-pull-stage', function() {

     console.log('Logging into stage server...'.red);

     // Create object for stage
     var stageSSH = new GulpSSH({
         ignoreErrors: false,
         sshConfig: config.staging.sslConfig
     });

     console.log('Move into theme dir and pull stage branch'.red);
     // Move into the public dir and download wp-cli
     return stageSSH
        .shell('cd public_html/wp-content/themes/' + config.themeFolder + ' && git checkout stage && git pull origin stage', {filePath: 'shell.log'})
        .pipe(gulp.dest('./'));
 });

 /**
  * stage-database-media   -   Pull files from local enviroment
  * *****************************************************************************
  */

gulp.task( 'stage-database-media', function() {

});
