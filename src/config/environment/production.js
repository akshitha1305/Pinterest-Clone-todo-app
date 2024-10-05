'use strict';
require('dotenv').config();

// Production specific configuration
// ==================================
module.exports = {
    mongo: {
        uri: process.env.MONGODB_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    },

    // Redis Connection
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        redis_db_index: process.env.REDIS_DB_INDEX,
        redis_prefix: process.env.REDIS_PREFIX
    }
};
