const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DB_USERNAME: process.env.DB_USERNAME || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || '',
    DB_HOSTNAME: process.env.DEV_HOSTNAME || '',
    DB_DIALECT: process.env.DB_DIALECT || 'mysql'
}