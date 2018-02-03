import mongoose from 'mongoose';

/**
 * SectionData Schema
 */

const SectionDataSchema = new mongoose.Schema({
    _id: String,
    id: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    metricData: {
        type: Array,
        required: true
    }
}, { _id: false });

/**
 * @typedef SectionData
 */
export default mongoose.model('SectionData', SectionDataSchema);
