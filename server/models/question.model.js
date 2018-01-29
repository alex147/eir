import mongoose from 'mongoose';

/**
 * Question Schema
 */

const QuestionSchema = new mongoose.Schema({
    _id: String,
    id: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    label: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    isRequired: {
        type: Boolean
    },
    notes: {
        type: String
    },
    defaultValue: {
        type: String
    },
    options: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionOption' }]
    }
}, { _id: false });

/**
 * @typedef Question
 */
export default mongoose.model('Question', QuestionSchema);
