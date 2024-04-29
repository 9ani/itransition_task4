const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    email: String,
    full_name: String,
    password: String,
    lastLogin: {
        type: Date,
    },
    registrationTime: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
})

module.exports = mongoose.model('user', UserSchema)