import mongoose from 'mongoose';
require('./visit-instance.model');

/**
 * VisitData Schema
 */

var VisitInstance = mongoose.model('VisitInstance').schema;

const VisitDataSchema = new mongoose.Schema({
    _id: String,
    trialId: {
        type: String,
        required: true,
        trim: true
    },
    subjectId: {
        type: String,
        required: true,
        trim: true
    },
    visits: [VisitInstance]
}, { _id: false });

/**
 * Statics
 */
VisitDataSchema.statics = {
    /**
     * Get visit data for subject
     * @param {String} id - The id of the subject.
     * @returns {Promise<VisitData, APIError>}
     */
    get (id) {
        return this.findOne({ "subjectId": id })
            .exec()
            .then((subjectData) => {
                if (subjectData) {
                    return subjectData;
                }
                const err = new APIError('No data entry for subject ' + id, httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    }
};

/**
 * @typedef VisitData
 */
export default mongoose.model('VisitData', VisitDataSchema);
