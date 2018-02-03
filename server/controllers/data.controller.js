import mongoose from 'mongoose';
import SectionData from '../models/section-data.model';
import VisitData from '../models/visit-data.model';

/**
 * Load data and append to req.
 */
function load (req, res, next, subjectId) {
    VisitData.get(subjectId)
        .then((visitData) => {
            req.visitData = visitData; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get visit data by given site ID.
 * @returns {VisitData[]}
 */
function getDataBySiteId (req, res) {
    const siteId = req.query.siteId;

    VisitData.find({ 'subjectId': new RegExp(siteId, 'i') },
        function (err, entries) {
            if (err) {
                response.send(err);
            }
            response.json(entries);
        });
}

/**
 * Get section data.
 * @returns {SectionData}
 */
function getSectionData (req, res) {
    const visitData = req.visitData;
    const visitId = req.query.visitId - 1;
    const sectionId = req.query.sectionId;

    var result = visitData.visits[visitId].capturedData.id(sectionId);
    res.json(result);
}

/**
 * Update existing section data entry
 * @property {string} req.body.id - The id of the section.
 * @property {string} req.body.name - The name of the section.
 * @property {string} req.body.status - The status of the section.
 * @property {any[]} req.body.metricData - The data collected for this section.
 * @returns {SectionData}
 */
function update (req, res, next) {
    const visitData = req.visitData;
    const visitId = req.query.visitId - 1;
    const sectionId = req.query.sectionId;

    var sectionData = visitData.visits[visitId].capturedData.id(sectionId);
    sectionData.metricData = req.body.metricData;
    sectionData.status = req.body.status;

    sectionData.save()
        .then(savedData => console.log("Updated a data for", savedData.id))
        .catch(e => next(e));
}

export default { load, update, getSectionData, getDataBySiteId };
