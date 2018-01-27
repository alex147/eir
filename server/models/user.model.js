import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
    _id: String,
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    sites: {
        type: [String]
    },
    trials: {
        type: [String]
    }
}, { _id: false });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
    /**
     * Get user
     * @param {String} username - The username of user.
     * @returns {Promise<User, APIError>}
     */
    get (username) {
        return this.findOne({ "username": username })
            .exec()
            .then((user) => {
                if (user) {
                    return user;
                }
                const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List users in ascending order by 'username'.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list ({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ username: 1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
