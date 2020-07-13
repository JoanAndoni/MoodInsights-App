'use strict';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
const saltRounds = 10;

const UserSchema = Schema({
    mail: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    connectedAccounts: {
        facebook: {
            token: String,
            userID: String,
        },
        spotify: {
            token: {
                value: String,
                expires: Number,
            },
            refreshToken: String,
        },
    },
    createdAt: { type: Date },
    role: { type: String },
    imageURL: { type: String },
    analysis: [{
        day: String,
        averageGrade: {
            positive: Number,
            neutral: Number,
            negative: Number
        },
        facebookGrade: {
            positive: Number,
            neutral: Number,
            negative: Number
        },
        spotifyGrade: {
            positive: Number,
            neutral: Number,
            negative: Number
        }
    }]
});

// create the model for users and expose it to our app
const User = module.exports = model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByMail = (mail, callback) => {
    const query = {
        mail: mail
    }
    User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save(callback);
    });
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}