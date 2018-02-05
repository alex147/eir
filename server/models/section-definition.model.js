import mongoose from 'mongoose';
require('./question.model');

/**
 * SectionDefinition Schema
 */

var Question = mongoose.model('Question').schema;

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
    questions: [Question]
}, { _id: false });

/**
 * @typedef SectionDefinition
 */
export default mongoose.model('SectionDefinition', SectionDefinitionSchema);
