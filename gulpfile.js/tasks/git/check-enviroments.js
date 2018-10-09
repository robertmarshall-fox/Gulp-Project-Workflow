var gulp                = require('gulp');
var shell               = require('gulp-shell');
var GulpSSH             = require('gulp-ssh');

var config              = require('../../../workflow-config');

var checkDetails        = require('../helpers/checkDetails.js');

/**
 * check-stage   -   Checks stage server connection
 * *****************************************************************************
 */

gulp.task( 'check-stage', function() {

    if ( checkDetails.ssl(config.staging.sslConfig) ){

        console.log('Logging into stage server...'.red);

        // Create object for stage
        var gulpSSH = new GulpSSH({
            ignoreErrors: false,
            sshConfig: config.staging.sslConfig
        });

        return gulpSSH
        .exec(['uptime'])
           .on('end', function() { gulpSSH.close(); });

        console.log('Connected to stage server'.red);

    }

});


/**
 * check-live   -   Checks live server connection
 * *****************************************************************************
 */

 gulp.task( 'check-live', function() {

     if ( checkDetails.ssl(config.live.sslConfig) ){

         console.log('Logging into live server...'.red);

         // Create object for stage
         var gulpSSH = new GulpSSH({
             ignoreErrors: false,
             sshConfig: config.live.sslConfig
         });

         return gulpSSH
         .exec(['uptime'])
            .on('end', function() { gulpSSH.close(); });

         console.log('Connected to live server'.red);

     }

});
