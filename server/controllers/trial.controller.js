import Trial from '../models/trial.model';
import TrialDefinition from '../models/trial-definition.model';
import VisitDefinition from '../models/visit-definition.model';
import mongoose from 'mongoose';

/**
 * Load trial and append to req.
 */
function load (req, res, next, id) {
    Trial.get(id)
        .then((trial) => {
            req.trial = trial; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get trial
 * @returns {Trial}
 */
function get (req, res) {
    return res.json(req.trial);
}

/**
 * Get all sites for a trial
 * @returns {string[]}
 */
function getSites (req, res) {
    return res.json(req.trial.sites);
}

/**
 * Create new trial
 * @property {string} req.body.id - The id of the trial.
 * @property {string} req.body.name - The name of the trial.
 * @property {string} req.body.description - The description of the trial.
 * @property {string[]} req.body.sites - The sites of the trial.
 * @property {number} req.body.numOfVisits - The number of visits for this trial.
 * @returns {Trial}
 */
function create (req, res, next) {
    const trial = new Trial({
        _id: req.body.id,
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        sites: req.body.sites,
        numOfVisits: req.body.numOfVisits
    });

    const trialDefinition = new TrialDefinition({
        _id: req.body.id,
        id: req.body.id,
        name: req.body.name,
        visitDefinitions: []
    });

    for (var i = 0; i < req.body.numOfVisits; i++) {
        const visitDefinition = new VisitDefinition({
            sections: []
        });

        visitDefinition.save()
            .then(savedVisit => console.log("Created a visit definition", savedVisit))
            .catch(e => next(e));

        trialDefinition.visitDefinitions.push(visitDefinition)
    }

    trialDefinition.save()
        .then(savedDefinition => console.log("Created trial definition for ID", trial.id))
        .catch(e => next(e));

    trial.save()
        .then(savedTrial => res.json(savedTrial))
        .catch(e => next(e));
}

/**
 * Update existing trial
 * @property {string} req.body.id - The id of the trial.
 * @property {string} req.body.name - The name of the trial.
 * @property {string} req.body.description - The description of the trial.
 * @property {string[]} req.body.sites - The sites of the trial.
 * @property {number} req.body.numOfVisits - The number of visits for this trial.
 * @returns {Trial}
 */
function update (req, res, next) {
    const trial = req.trial;

    const numOfVisitsDiff = req.body.numOfVisits - trial.numOfVisits;

    trial.name = req.body.name;
    trial.description = req.body.description;
    trial.sites = req.body.sites;
    trial.numOfVisits = req.body.numOfVisits;

    if (numOfVisitsDiff > 0) {
        TrialDefinition.findOne({ 'id': trial.id })
            .populate('visitDefinitions')
            .exec(function (err, definition) {
                for (var i = 0; i < numOfVisitsDiff; i++) {
                    const visitDefinition = new VisitDefinition({
                        _id: trial.numOfVisits - i - 1,
                        sections: []
                    });

                    visitDefinition.save()
                        .then(savedVisit => console.log("Created a visit definition", savedVisit))
                        .catch(e => next(e));

                    definition.visitDefinitions.push(visitDefinition);
                }

                definition.save()
                    .then(savedDefinition => console.log("Created trial definition for ID", trial.id))
                    .catch(e => next(e));
            });
    }

    trial.save()
        .then(savedTrial => res.json(savedTrial))
        .catch(e => next(e));
}

/**
 * Get trial list.
 * @property {number} req.query.skip - Number of trials to be skipped.
 * @property {number} req.query.limit - Limit number of trials to be returned.
 * @returns {Trial[]}
 */
function list (req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Trial.list({ limit, skip })
        .then(trials => res.json(trials))
        .catch(e => next(e));
}

/**
 * Delete trial.
 * @returns {Trial}
 */
function remove (req, res, next) {
    const trial = req.trial;

    TrialDefinition.findOne({ 'id': trial.id })
        .remove()
        .then(deletedDefinition => console.log("Deleted trial definition for ID", trial.id))
        .catch(e => next(e));

    trial.remove()
        .then(deletedTrial => res.json(deletedTrial))
        .catch(e => next(e));
}

export default { load, get, getSites, create, update, list, remove };
