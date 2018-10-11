var gulp                = require('gulp');
var shell               = require('gulp-shell');
var prompt              = require('gulp-prompt');

var config              = require('../../../workflow-config');
var checkBasicAuth      = require('../helpers/getBasicAuth.js');

/**
 * @ TODO
 * Currently depending on wp-migrate to pull/push database and media. Be nice
 * to move this across to only using wp-cli and some other media management
 */

/**
  * stage-database-media   -   Pull files from local enviroment
  * *****************************************************************************
  */

gulp.task( 'stage-database-media', function() {
    return gulp.src( './*')
    .pipe(prompt.prompt({
        type: 'confirm',
        name: 'start',
        message: 'Are you sure you want to move files to stage from local? IT WILL OVERWRITE'.bgRed.white
    }, function(res){
        if(res.start){

            if( checkBasicAuth.getDetails('staging', config) ){

                console.log('Copying local media and database to staging'.red);
                gulp.start('run-stage-database-media');

            }

        }
    }));
});


gulp.task( 'run-stage-database-media', shell.task(
    'cd ../../../ && ' +
    'php wp-cli.phar migratedb push ' +
    getURL('staging') + ' ' +
    config.staging.wpMigrateSecretKey + ' ' +
    '--backup' + ' ' +
    '--media=remove-and-copy'
));


/**
  * live-database-media   -   Pull files from live enviroment to local
  * *****************************************************************************
  */

gulp.task( 'get-live-database-media', function() {
    return gulp.src( './*')
    .pipe(prompt.prompt({
        type: 'confirm',
        name: 'start',
        message: 'Are you sure you want to pull files from the live site? IT WILL OVERWRITE'.bgRed.white
    }, function(res){
        if(res.start){

            if( checkBasicAuth.getDetails('live', config) ){

                console.log('Copying local media and database from live site'.red);
                gulp.start('run-live-database-media');

            }

        }
    }));
});


gulp.task( 'run-live-database-media', shell.task(
    'cd ../../../ && ' +
    'php wp-cli.phar migratedb pull ' +
    getURL('live') + ' ' +
    config.live.wpMigrateSecretKey + ' ' +
    '--backup' + ' ' +
    '--media=remove-and-copy'
));




function getURL(server) {
    return checkBasicAuth.makeURL(
        checkBasicAuth.getDetails(server, config),
        config[server].wpURL
    );
}
