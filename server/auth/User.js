const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true, 
        required: true,
    },
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

UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('user', UserSchema)