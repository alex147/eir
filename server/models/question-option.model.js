import mongoose from 'mongoose';

/**
 * QuestionOption Schema
 */

const QuestionOptionSchema = new mongoose.Schema({
    _id: String,
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
}, { _id: false });

/**
 * @typedef QuestionOption
 */
export default mongoose.model('QuestionOption', QuestionOptionSchema);
