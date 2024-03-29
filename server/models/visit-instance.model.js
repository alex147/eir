import mongoose from 'mongoose';
require('./section-data.model');

/**
 * VisitInstance Schema
 */

var SectionData = mongoose.model('SectionData').schema;

const VisitInstanceSchema = new mongoose.Schema({
    capturedData: [SectionData]
});

/**
 * @typedef VisitInstance
 */
export default mongoose.model('VisitInstance', VisitInstanceSchema);
