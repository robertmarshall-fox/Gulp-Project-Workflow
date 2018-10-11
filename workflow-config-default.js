var gulp         = require('gulp'); // Gulp of-course
var fs           = require('fs');

const computerName = 'RobMarshall';

function getSSHFile( computerName ){
    var path = '/Users/' + computerName + '/.ssh/id_rsa';
    if (fs.existsSync(path)) {
        return fs.readFileSync( path );
    }
    return '';
}

module.exports = {
    themeFolder: '',
    local: {
        computerName: computerName,
    },
    staging: {
        basicAuth: {
            user: '',
            pass: ''
        },
        wpURL: 'http://www.google.com',
        wpMigrateSecretKey: '',
        sslConfig: {
            host: '',
            port: 22,
            passphrase: '',
            username: '',
            privateKey: getSSHFile( computerName )
        }
    },
    live: {
        basicAuth: {
            user: '',
            pass: ''
        },
        wpURL: '',
        wpMigrateSecretKey: '',
        sslConfig: {
            host: '',
            port: 22,
            username: '',
            privateKey: getSSHFile( computerName )
        }
    }
};
