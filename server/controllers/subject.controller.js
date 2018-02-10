import Subject from '../models/subject.model';
import VisitData from '../models/visit-data.model';
import VisitInstance from '../models/visit-instance.model';
import SectionData from '../models/section-data.model';
import TrialDefinition from '../models/trial-definition.model';
import mongoose from 'mongoose';

/**
 * Load subject and append to req.
 */
function load (req, res, next, id) {
    Subject.get(id)
        .then((subject) => {
            req.subject = subject; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get subject
 * @returns {Subject}
 */
function get (req, res) {
    return res.json(req.subject);
}

/**
 * Create new subject
 * @property {string} req.body.id - The id of the subject.
 * @property {Date} req.body.consentDate - The consent date of the subject.
 * @property {string} req.body.gender - The gender of the subject.
 * @property {boolean} req.body.isActive - Indicates whether the subject is actively participating in the trial.
 * @property {string} req.body.status - The status of this subject.
 * @property {Date} req.body.statusDate - The status date of this subject.
 * @property {string} req.body.trialId - The ID of the trial that this subject is part of.
 * @property {string} req.body.siteId - The ID of the site that this subject is part of.
 * @property {number} req.body.completedVisits - The number of visits that this subject has completed so far.
 * @returns {Subject}
 */
function create (req, res, next) {
    var visitData = new VisitData({
        _id: req.body.id,
        trialId: req.body.trialId,
        subjectId: req.body.id,
        visits: []
    });

    TrialDefinition.get(req.body.trialId)
        .then((definition) => {
            definition.visitDefinitions.forEach(function (visit, i) {
                var instance = new VisitInstance({
                    capturedData: []
                });

                visit.sections.forEach(function (section) {
                    var sectionData = new SectionData({
                        id: section.id,
                        name: section.name,
                        status: "Not Started",
                        metricData: []
                    });

                    instance.capturedData.push(sectionData);
                });

                visitData.visits.push(instance);
            });


            visitData.save()
                .then(savedData => console.log("Created empty visit data for subject", req.body.id))
                .catch(e => next(e));
        })
        .catch(e => next(e));

    const subject = new Subject({
        _id: req.body.id,
        id: req.body.id,
        consentDate: req.body.consentDate,
        gender: req.body.gender,
        isActive: req.body.isActive,
        status: req.body.status,
        statusDate: req.body.statusDate,
        trialId: req.body.trialId,
        siteId: req.body.siteId,
        completedVisits: req.body.completedVisits,
    });

    subject.save()
        .then(savedSubject => res.json(savedSubject))
        .catch(e => next(e));
}

/**
 * Update existing subject
 * @property {string} req.body.id - The id of the subject.
 * @property {Date} req.body.consentDate - The consent date of the subject.
 * @property {string} req.body.gender - The gender of the subject.
 * @property {boolean} req.body.isActive - Indicates whether the subject is actively participating in the trial.
 * @property {string} req.body.status - The status of this subject.
 * @property {Date} req.body.statusDate - The status date of this subject.
 * @property {string} req.body.trialId - The ID of the trial that this subject is part of.
 * @property {string} req.body.siteId - The ID of the site that this subject is part of.
 * @property {number} req.body.completedVisits - The number of visits that this subject has completed so far.
 * @returns {Subject}
 */
function update (req, res, next) {
    const subject = req.subject;

    subject.consentDate = req.body.consentDate;
    subject.gender = req.body.gender;
    subject.isActive = req.body.isActive;
    subject.status = req.body.status;
    subject.statusDate = req.body.statusDate;
    subject.trialId = req.body.trialId;
    subject.siteId = req.body.siteId;
    subject.completedVisits = req.body.completedVisits;

    subject.save()
        .then(savedSubject => res.json(savedSubject))
        .catch(e => next(e));
}

/**
 * Get subject list.
 * @property {number} req.query.skip - Number of subjects to be skipped.
 * @property {number} req.query.limit - Limit number of subjects to be returned.
 * @returns {Subject[]}
 */
function list (req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Subject.list({ limit, skip })
        .then(subjects => res.json(subjects))
        .catch(e => next(e));
}

/**
 * Get subject list by trial ID and site ID.
 * @returns {Subject[]}
 */
function getByTrialAndSiteId (req, res, next) {
    const trialId = req.query.trialId;
    const siteId = req.query.siteId;

    Subject.find({ 'trialId': trialId, 'siteId': siteId })
        .then(subjects => res.json(subjects))
        .catch(e => next(e));
}

/**
 * Delete subject.
 * @returns {Subject}
 */
function remove (req, res, next) {
    const subject = req.subject;

    VisitData.findOne({ 'subjectId': subject.id })
        .remove()
        .then(deletedData => console.log("Deleted visit data for ID", subject.id))
        .catch(e => next(e));

    subject.remove()
        .then(deletedSubject => res.json(deletedSubject))
        .catch(e => next(e));
}

export default { load, get, create, update, list, getByTrialAndSiteId, remove };
