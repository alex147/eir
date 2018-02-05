import mongoose from 'mongoose';
require('./section-definition.model');

/**
 * VisitDefinition Schema
 */

var SectionDefinition = mongoose.model('SectionDefinition').schema;

const VisitDefinitionSchema = new mongoose.Schema({
    sections: [SectionDefinition]
});

/**
 * @typedef VisitDefinition
 */
export default mongoose.model('VisitDefinition', VisitDefinitionSchema);
