import mongoose from 'mongoose';
require('./section-data.model');

/**
 * VisitInstance Schema
 */

var SectionData = mongoose.model('SectionData').schema;

const VisitInstanceSchema = new mongoose.Schema({
    _id: String,
    id: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String
    },
    capturedData: [SectionData]
}, { _id: false });

/**
 * @typedef VisitInstance
 */
export default mongoose.model('VisitInstance', VisitInstanceSchema);
