var gulp                = require('gulp');
var runSequence         = require('run-sequence');

gulp.task( 'setup-local-enviro', function() {

    console.log('Lets kick it off'.red);
    runSequence(
        'git-kickoff',
        'local-wp-cli-setup',
    );

});



gulp.task( 'stage-project', function() {

    console.log('Lets kick it off'.red);
    runSequence(
        'git-stage',
        'git-pull-stage',
        'stage-database-media',
    );

});



gulp.task( 'live-project', function() {

    console.log('Lets kick it off'.red);
    runSequence(
        'git-master',
        'git-pull-master',
    );

});
