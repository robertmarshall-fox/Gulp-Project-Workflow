var gulp                = require('gulp');
var fs                  = require('fs');
var fileExists          = require('file-exists');
var git                 = require('gulp-git');
var runSequence         = require('run-sequence');

var colors              = require('colors');

var config              = require('../../../gulpconfig');

/**
 * git-kickoff   -   Initialise the project
 * *****************************************************************************
 */

/**
 * These tasks do the following to kick a project off:
 * 1. Set up Git in project file
 * 2. Add package.json file
 * 3. Commits with "Initial Commit" message
 * 4. Sets up "build" and "stage" branches
 * 5. Adds the origin from the package.json
 * 6. Publishes Git
 * 7. Moves current branch to build
 */

gulp.task( 'git-kickoff', function() {
    if( config.packageJson && config.packageJson.repository.url ){
        console.log('Lets kick it off'.green);
        runSequence(
            'git-init',
            'git-add-existing',
            'git-commit',
            'git-branch',
            'git-addremote',
            'git-publish',
            'git-checkout-build'
        );
    }
});


// Create Git
gulp.task( 'git-init', function( done ) {
    console.log('Creating Git'.green);
    git.init(function (err) {
        if (err) {
            done(err);
        }
        done();
    });
});


// Add any files
gulp.task('git-add-existing', function() {
    console.log('adding package.json'.green);
    return gulp.src('./package-lock.json')
        .pipe(git.add());
});


// Commit files
gulp.task('git-commit', function(){
    console.log('committing'.green);
    return gulp.src('./package-lock.json')
        .pipe(git.commit('Initial Commit'));
});


// Set up branches
gulp.task('git-branch', function(){
    console.log('Make "build" branch'.green);
    git.branch('build', function (err) {
        if (err) throw err;
    });
    console.log('Make "stage" branch'.green);
    git.branch('stage', function (err) {
        if (err) throw err;
    });
});


// Add remote
gulp.task('git-addremote', function(){
    console.log('Add remote origin'.green);
    git.addRemote('origin', config.packageJson.repository.url, function (err) {
        if (err) throw err;
    });
});


// Push all current files to master
gulp.task('git-publish', function(){
    console.log('Publish to origin'.green);
    git.push('origin', 'master', function (err) {
        if (err) throw err;
    });
});


// Move back to build branch
gulp.task('git-checkout-build', function(){
    console.log('Move back to build branch'.green);
    git.checkout('build', function (err) {
        if (err) {
            throw err;
        } else {
            console.log('and back to build!!!'.green);
        }
    });
});
