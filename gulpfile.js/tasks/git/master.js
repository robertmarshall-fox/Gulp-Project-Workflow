var gulp                = require('gulp');
var fs                  = require('fs');
var fileExists          = require('file-exists');
var git                 = require('gulp-git');
var prompt              = require('gulp-prompt');

var runSequence         = require('run-sequence');

var config              = require('../../../gulpconfig');

/**
 * git-master   -   Push files to master branch
 * *****************************************************************************
 */

/**
 * These tasks do the following to stage the project:
 * 1. Confirm ready to push to master branch
 * 2. Move branch to master
 * 3. Get commit message
 * 4. Merge built branch to master
 * 5. Publishes Git
 * 6. Moves current branch to build
 */

/**
 * TODO
 * Both master and stage use almost the same functions
 * Turn these to one page, that can be passed a master/stage argument?
 */

 gulp.task( 'git-master', function() {
         console.log('Lets push to master branch');
         runSequence(
             'git-confirm-master-merge',
             'git-merge-build',
             'git-publish-stage',
             'git-checkout-build'
         );
 });


 gulp.task('git-confirm-master-merge', function( done ){
     return gulp.src( './*')
     .pipe(prompt.prompt({
         type: 'confirm',
         name: 'start',
         message: 'Are you sure you everything is error free? Remeber, this goes LIVE'
     }, function(res){
         if(res.start){
             gulp.start('git-move-to-master')
         }
     }));
 });


// Move to stage branch
gulp.task( 'git-move-to-master', function() {
    console.log('Moved to master branch');
    git.checkout('master', function (err) {
        if (err) throw err;
    });
});


// Merge stage to current branch
gulp.task('git-merge-stage', function(){
    git.merge('stage', function (err) {
        if (err) throw(err);
    });
});


// Push all current files to master
gulp.task('git-publish-master', function(){
    console.log('Publish to master');
    git.push('origin', 'master', function (err) {
        if (err) throw err;
    });
});
