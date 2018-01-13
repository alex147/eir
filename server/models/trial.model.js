import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Trial Schema
 */
const TrialSchema = new mongoose.Schema({
    _id: String,
    id: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sites: {
        type: [String]
    },
    numOfVisits: {
        type: Number,
        required: true
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
TrialSchema.method({
});

/**
 * Statics
 */
TrialSchema.statics = {
    /**
     * Get trial
     * @param {String} id - The id of the trial.
     * @returns {Promise<User, APIError>}
     */
    get (id) {
        return this.findOne({ "id": id })
            .exec()
            .then((trial) => {
                if (trial) {
                    return trial;
                }
                const err = new APIError('No such trial exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List trials in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of trials to be skipped.
     * @param {number} limit - Limit number of trials to be returned.
     * @returns {Promise<Trial[]>}
     */
    list ({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ id: 1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

/**
 * @typedef Trial
 */
export default mongoose.model('Trial', TrialSchema);
