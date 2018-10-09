var gulp                = require('gulp');
var git                 = require('gulp-git');
var prompt              = require('gulp-prompt');
var colors              = require('colors');
var shell               = require('gulp-shell');
var GulpSSH             = require('gulp-ssh');

var config              = require('../../../workflow-config');
var gulpConfig          = require('../../../gulpconfig');
var checkDetails        = require('../helpers/checkDetails.js');


/**
 * git-master   -   Push files to master branch
 * *****************************************************************************
 */

/**
 * These tasks do the following to stage the project:
 * 1. Confirm ready to push to master branch
 * 2. Move branch to master
 * 3. Merge built branch to master
 * 4. Publishes Git
 * 5. Moves current branch to build
 */

/**
 * TODO
 * Both master and stage use almost the same functions
 * Turn these to one page, that can be passed a master/stage argument?
 */

 gulp.task( 'git-master', function() {
     // First check we have details
     if ( checkDetails.git(gulpConfig.packageJson)  ){
         console.log('Lets push to master branch'.red);
         gulp.start('git-confirm-master-merge');
     }
 });


 gulp.task('git-confirm-master-merge', function( done ){
     return gulp.src( './*')
     .pipe(prompt.prompt({
         type: 'confirm',
         name: 'start',
         message: 'Are you sure you everything is error free? Remeber, this goes LIVE'.bgRed.white
     }, function(res){
         if(res.start){
             gulp.start('git-move-to-master');
         }
     }));
 });


// Move to stage branch
gulp.task( 'git-move-to-master', function() {
    console.log('Moved to master branch'.red);
    git.checkout('master', function (err) {
        if (err) {
            throw err;
        } else {
            gulp.start('git-merge-stage');
        }
    });
});


// Merge stage to current branch
gulp.task('git-merge-stage', function(){
    git.merge('stage', function (err) {
        if (err) {
            throw err;
        } else {
            gulp.start('git-publish-master');
        }
    });
});


// Push all current files to master
gulp.task('git-publish-master', function(){
    console.log('Publishing to master...'.red);
    git.push('origin', 'master', function (err) {
        if (err) {
            throw err;
        } else {
            gulp.start('git-checkout-build');
        }
    });
});


/**
 * git-clone-master   -   Clone files from master branch
 * *****************************************************************************
 */

 gulp.task( 'git-clone-master', function() {

     if( checkDetails.ssl(config.live.sslConfig) && checkDetails.git(gulpConfig.packageJson) ){

         var repository = gulpConfig.packageJson.repository.url;

         console.log('Logging into live server...'.red);

         // Create object for stage
         var liveSSH = new GulpSSH({
             ignoreErrors: false,
             sshConfig: config.live.sslConfig
         });

         console.log('Move into theme dir and clone master branch'.red);

         // Move into the theme dir
         // Init git
         // clone stage branch
         return liveSSH
            .shell(
                'cd public_html/wp-content/themes/' + config.themeFolder + ' && ' +
                'git init && ' +
                'git clone ' + repository
            , {filePath: 'shell.log'})
            .pipe(gulp.dest('./'));

    }

 });


/**
 * git-pull-master   -   Pull files from master branch
 * *****************************************************************************
 */

 gulp.task( 'git-pull-master', function() {

     // Make sure we have all the details

     if( checkDetails.ssl(config.live.sslConfig) && checkDetails.git(gulpConfig.packageJson) ){

         var repository = gulpConfig.packageJson.repository.url;

         console.log('Logging into live server...'.red);

         // Create object for stage
         var liveSSH = new GulpSSH({
             ignoreErrors: false,
             sshConfig: config.live.sslConfig
         });

         console.log('Move into theme dir and pull master branch'.red);
         // Move into the theme dir
         // pull master branch
         return liveSSH
            .shell(
                'cd public_html/wp-content/themes/' + config.themeFolder + ' && ' +
                'git pull ' + repository + ' master'
            , {filePath: 'shell.log'})
            .pipe(gulp.dest('./'));

    }
 });
