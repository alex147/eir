import mongoose from 'mongoose';

/**
 * SectionDefinition Schema
 */

const SectionDefinitionSchema = new mongoose.Schema({
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
    description: {
        type: String
    },
    questions: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
    }
}, { _id: false });

/**
 * @typedef SectionDefinition
 */
export default mongoose.model('SectionDefinition', SectionDefinitionSchema);
