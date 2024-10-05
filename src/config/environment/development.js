'use strict';

const { default: mongoose } = require('mongoose');

require('dotenv').config();

module.exports = {
    mongo: {
        uri: process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.7l3gq9i.mongodb.net/cincodb?retryWrites=true&w=majority'
    },
    seedDB: false,
    userRoles: {
        superAdmin:  mongoose.Types.ObjectId('653f2a4cba83da662b57460b'),
        admin:  mongoose.Types.ObjectId('653f2ae2ba83da662b57460d'),
        employee:  mongoose.Types.ObjectId('653f2b6dba83da662b57460f'),
    }
};
