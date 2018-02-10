import mongoose from 'mongoose';
import SectionData from '../models/section-data.model';
import VisitData from '../models/visit-data.model';
import VisitInstance from '../models/visit-instance.model';

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
    const trialId = req.query.trialId;

    VisitData.find({
        'subjectId': new RegExp(siteId, 'i'),
        'trialId': trialId
    },
        function (err, entries) {
            if (err) {
                res.send(err);
            }
            res.json(entries);
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

    if (!visitData.visits[visitId]) {
        res.json();
        return;
    }

    var result = visitData.visits[visitId].capturedData.find(
        function (element) {
            return element.id === sectionId;
        });
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

    if (!visitData.visits[visitId]) {
        var instance = new VisitInstance({
            capturedData: []
        });

        var sectionData = new SectionData({
            id: req.body.id,
            name: req.body.name,
            status: req.body.status,
            metricData: req.body.metricData
        });

        instance.capturedData.push(sectionData);
        visitData.visits.push(instance);
    } else {
        var sectionData = visitData.visits[visitId].capturedData.find(
            function (element) {
                return element.id === sectionId;
            });

        sectionData.metricData = req.body.metricData;
        sectionData.status = req.body.status;
    }

    visitData.save()
        .then(savedData => console.log("Updated data for", visitData.subjectId))
        .catch(e => next(e));
}

export default { load, update, getSectionData, getDataBySiteId };
