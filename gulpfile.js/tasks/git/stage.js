var gulp                = require('gulp');
var fs                  = require('fs');
var fileExists          = require('file-exists');
var git                 = require('gulp-git');
var prompt              = require('gulp-prompt');

var config              = require('../../../gulpconfig');

/**
 * git-stage   -   Push files to staging branch
 * *****************************************************************************
 */

/**
 * These tasks do the following to stage the project:
 * 1. Confirm ready to push to stage branch
 * 2. Move branch to stage
 * 3. Get commit message
 * 4. Merge built branch to stage
 * 5. Publishes Git
 * 6. Moves current branch to build
 */

 gulp.task( 'git-stage', function() {
         console.log('Lets push to staging branch');
         gulp.start('git-confirm-staging-merge')
 });


 gulp.task('git-confirm-staging-merge', function( done ){
     return gulp.src( './*')
     .pipe(prompt.prompt({
         type: 'confirm',
         name: 'start',
         message: 'Are you sure you are ready to stage?'
     }, function(res){
         if(res.start){
             gulp.start('git-move-to-stage');
         }
     }));
 });


// Move to stage branch
gulp.task( 'git-move-to-stage', function() {
    console.log('Moved to stage branch');
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
    console.log('Publish to stage');
    git.push('origin', 'stage', function (err) {
        if (err) {
            throw err;
        } else {
            gulp.start('git-checkout-build');
        }
    });
});
