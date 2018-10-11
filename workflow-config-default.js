var gulp         = require('gulp'); // Gulp of-course
var fs           = require('fs');

const computerName = '';

module.exports = {
    themeFolder: '',
    local: {
        computerName: computerName,
    },
    staging: {
        basicAuth: {
            user: '',
            pass: '',
        },
        wpURL: '',
        wpMigrateSecretKey: '',
        sslConfig: {
            host: '',
            port: 22,
            passphrase: '',
            username: '',
            privateKey: fs.readFileSync('/Users/' + computerName + '/.ssh/id_rsa')
        }
    },
    live: {
        basicAuth: {
            user: '',
            pass: '',
        },
        wpURL: '',
        wpMigrateSecretKey: '',
        sslConfig: {
            host: '',
            port: 22,
            username: '',
            privateKey: fs.readFileSync('/Users/' + computerName + '/.ssh/id_rsa')
        }
    }
};
