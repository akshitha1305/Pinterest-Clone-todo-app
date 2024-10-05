const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    
    password: {
        type: String,
        required: true,
    },
    re_password: {
        type: String,
        required: true,
    },
    access_token: {
        type: String,
        default: '',
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    is_archive: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

const Account = mongoose.model('account', accountSchema);

module.exports = Account;