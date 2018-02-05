import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
require('./visit-definition.model');

/**
 * TrialDefinition Schema
 */

var VisitDefinition = mongoose.model('VisitDefinition').schema;

const TrialDefinitionSchema = new mongoose.Schema({
    _id: String,
    id: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    visitDefinitions: [VisitDefinition]
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
TrialDefinitionSchema.method({
});

/**
 * Statics
 */
TrialDefinitionSchema.statics = {
    /**
     * Get definition
     * @param {String} id - The id of the trial definition.
     * @returns {Promise<TrialDefinition, APIError>}
     */
    get (id) {
        return this.findOne({ "id": id })
        .exec()
        .then((definition) => {
            if (definition) {
                return definition;
            }
            const err = new APIError('No such definition exists!', httpStatus.NOT_FOUND);
            return Promise.reject(err);
        });
    },

    /**
     * List definitions in ascending order by 'id'.
     * @param {number} skip - Number of definitions to be skipped.
     * @param {number} limit - Limit number of definitions to be returned.
     * @returns {Promise<TrialDefinition[]>}
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
 * @typedef TrialDefinition
 */
export default mongoose.model('TrialDefinition', TrialDefinitionSchema);
