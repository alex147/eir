import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Subject Schema
 */
const SubjectSchema = new mongoose.Schema({
    _id: String,
    id: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    consentDate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    statusDate: {
        type: Date,
        required: true
    },
    trialId: {
        type: String,
        required: true
    },
    siteId: {
        type: String,
        required: true
    },
    completedVisits: {
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
SubjectSchema.method({
});

/**
 * Statics
 */
SubjectSchema.statics = {
    /**
     * Get subject
     * @param {String} id - The id of subject.
     * @returns {Promise<Subject, APIError>}
     */
    get (id) {
        return this.findOne({ "id": id })
            .exec()
            .then((id) => {
                if (id) {
                    return id;
                }
                const err = new APIError('No such subject exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List subjects in ascending order by 'id'.
     * @param {number} skip - Number of subjects to be skipped.
     * @param {number} limit - Limit number of subjects to be returned.
     * @returns {Promise<Subject[]>}
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
 * @typedef Subject
 */
export default mongoose.model('Subject', SubjectSchema);
