import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Site Schema
 */
const SiteSchema = new mongoose.Schema({
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
    country: {
        type: String,
        required: true
    },
    lead: {
        type: String,
        required: true
    },
    contacts: {
        type: String
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
SiteSchema.method({
});

/**
 * Statics
 */
SiteSchema.statics = {
    /**
     * Get site
     * @param {String} id - The id of the site.
     * @returns {Promise<Site, APIError>}
     */
    get (id) {
        return this.findOne({ "id": id })
            .exec()
            .then((site) => {
                if (site) {
                    return site;
                }
                const err = new APIError('No such site exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List sites in ascending order by 'id'.
     * @param {number} skip - Number of sites to be skipped.
     * @param {number} limit - Limit number of sites to be returned.
     * @returns {Promise<Site[]>}
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
 * @typedef Site
 */
export default mongoose.model('Site', SiteSchema);
