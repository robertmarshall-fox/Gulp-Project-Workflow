var gulp                = require('gulp');
var fs                  = require('fs');
var fileExists          = require('file-exists');
var git                 = require('gulp-git');
var runSequence         = require('run-sequence');

var config              = require('../../gulpconfig');


/**
 * These tasks do the following to kick a project off:
 * 1. Set up Git in project file
 * 2. Add all current project files
 * 3. Commits with "Initial Commit" message
 * 4. Sets up "build" and "stage" branches
 * 5. Adds the origin from the package.json
 * 6. Publishes Git
 * 7. Moves current branch to build
 */

gulp.task( 'git-kickoff', function() {
    if( config.packageJson && config.packageJson.repository.url ){
        console.log('Lets kick it off');
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
gulp.task( 'git-init', function() {
    console.log('Creating Git');
    git.init(function (err) {
        if (err) throw err;
    });
});


// Add any files
gulp.task('git-add-existing', function() {
    console.log('adding existing');
    return gulp.src('*')
        .pipe(git.add());
});


// Commit files
gulp.task('git-commit', function(){
    console.log('committing');
    return gulp.src('.')
        .pipe(git.commit('initial commit'));
});


// Set up branches
gulp.task('git-branch', function(){
    console.log('Make "build" branch');
    git.branch('build', function (err) {
        if (err) throw err;
    });
    console.log('Make "stage" branch');
    git.branch('stage', function (err) {
        if (err) throw err;
    });
});


// Add remote
gulp.task('git-addremote', function(){
    console.log('Add remote origin');
    git.addRemote('origin', config.packageJson.repository.url, function (err) {
        if (err) throw err;
    });
});


// Push all current files to master
gulp.task('git-publish', function(){
    console.log('Publish to origin');
    git.push('origin', 'master', function (err) {
        if (err) throw err;
    });
});


// Move back to build branch
gulp.task('git-checkout-build', function(){
    console.log('Move back to build branch');
    git.checkout('build', function (err) {
        if (err) throw err;
    });
});
