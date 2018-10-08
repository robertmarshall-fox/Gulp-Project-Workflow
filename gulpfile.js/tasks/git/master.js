var gulp                = require('gulp');
var git                 = require('gulp-git');

var colors              = require('colors');

var prompt              = require('gulp-prompt');

var config              = require('../../../gulpconfig');

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
     console.log('Lets push to master branch'.red);
     gulp.start('git-confirm-master-merge');
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
