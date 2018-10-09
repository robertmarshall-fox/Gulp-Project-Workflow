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
 * git-stage   -   Push files to staging branch
 * *****************************************************************************
 */

/**
 * These tasks do the following to stage the project:
 * 1. Confirm ready to push to stage branch
 * 2. Move branch to stage
 * 3. Merge built branch to stage
 * 4. Publishes Git
 * 5. Moves current branch to build
 */

 gulp.task( 'git-stage', function() {
     // First check we have details
     if ( checkDetails.ssl(config.staging.sslConfig) && checkDetails.git(gulpConfig.packageJson)  ){
         console.log('Lets push to stage branch'.red);
         gulp.start('git-confirm-staging-merge');
     }
 });


 gulp.task('git-confirm-staging-merge', function( done ){
     return gulp.src( './*')
     .pipe(prompt.prompt({
         type: 'confirm',
         name: 'start',
         message: 'Are you sure you are ready to stage?'.bgRed.white
     }, function(res){
         if(res.start){
             gulp.start('git-move-to-stage');
         }
     }));
 });


// Move to stage branch
gulp.task( 'git-move-to-stage', function() {
    console.log('Moved to stage branch'.red);
    git.checkout('stage', function (err) {
        if (err) {
            throw err;
        } else {
            gulp.start('git-merge-build');
        }
    });
});


// Merge build to current branch
gulp.task('git-merge-build', function(){
    git.merge('build', function (err) {
        if (err) {
            throw err;
        } else {
            gulp.start('git-publish-stage');
        }
    });
});


// Push all current files to master
gulp.task('git-publish-stage', function(){
    console.log('Publishing to stage...'.red);
    git.push('origin', 'stage', function (err) {
        if (err) {
            throw err;
        } else {
            gulp.start('git-checkout-build');
        }
    });
});


/**
 * git-clone-stage   -   Clone files from staging branch
 * *****************************************************************************
 */

 gulp.task( 'git-clone-stage', function() {

     if( checkDetails.ssl(config.staging.sslConfig) && checkDetails.git(gulpConfig.packageJson) ){

         var repository = gulpConfig.packageJson.repository.url;

         console.log('Logging into stage server...'.red);

         // Create object for stage
         var stageSSH = new GulpSSH({
             ignoreErrors: false,
             sshConfig: config.staging.sslConfig
         });

         console.log('Move into theme dir and clone stage branch'.red);

         // Move into the theme dir
         // Init git
         // clone stage branch
         return stageSSH
            .shell(
                'cd public_html/wp-content/themes/' + config.themeFolder + ' && ' +
                'git init && ' +
                'git clone --single-branch -b stage ' + repository + ' && ' +
                'git checkout'
            , {filePath: 'shell.log'})
            .pipe(gulp.dest('./'));

    }

 });


/**
 * git-pull-stage   -   Pull files from staging branch
 * *****************************************************************************
 */

 gulp.task( 'git-pull-stage', function() {

     // Make sure we have all the details

     if( checkDetails.ssl(config.staging.sslConfig) && checkDetails.git(gulpConfig.packageJson) ){

         var repository = gulpConfig.packageJson.repository.url;

         console.log('Logging into stage server...'.red);

         // Create object for stage
         var stageSSH = new GulpSSH({
             ignoreErrors: false,
             sshConfig: config.staging.sslConfig
         });

         console.log('Move into theme dir and pull stage branch'.red);

         // Move into the theme dir
         // pull stage branch
         return stageSSH
            .shell(
                'cd public_html/wp-content/themes/' + config.themeFolder + ' && ' +
                'git pull ' + repository + ' stage'
            , {filePath: 'shell.log'})
            .pipe(gulp.dest('./'));

    }
 });
