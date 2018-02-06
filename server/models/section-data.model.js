import mongoose from 'mongoose';

/**
 * SectionData Schema
 */

const SectionDataSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
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
        type: Object
    }
});

/**
 * @typedef SectionData
 */
export default mongoose.model('SectionData', SectionDataSchema);
