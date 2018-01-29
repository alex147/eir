import mongoose from 'mongoose';

/**
 * VisitDefinition Schema
 */

const VisitDefinitionSchema = new mongoose.Schema({
    _id: String,
    sections: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SectionDefinition' }]
    }
}, { _id: false });

/**
 * @typedef VisitDefinition
 */
export default mongoose.model('VisitDefinition', VisitDefinitionSchema);
