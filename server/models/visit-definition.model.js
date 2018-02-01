import mongoose from 'mongoose';

/**
 * VisitDefinition Schema
 */

const VisitDefinitionSchema = new mongoose.Schema({
    sections: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SectionDefinition' }]
    }
});

/**
 * @typedef VisitDefinition
 */
export default mongoose.model('VisitDefinition', VisitDefinitionSchema);
