import Trial from '../models/trial.model';
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
 * Create new trial
 * @property {string} req.body.id - The id of the trial.
 * @property {string} req.body.name - The name of the trial.
 * @property {string} req.body.description - The description of the trial.
 * @property {string[]} req.body.centers - The centers of the trial.
 * @property {number} req.body.numOfVisits - The number of visits for this trial.
 * @returns {Trial}
 */
function create (req, res, next) {
    const trial = new Trial({
        _id: req.body.id,
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        centers: req.body.centers,
        numOfVisits: req.body.numOfVisits,
    });

    trial.save()
        .then(savedTrial => res.json(savedTrial))
        .catch(e => next(e));
}

/**
 * Update existing trial
 * @property {string} req.body.id - The id of the trial.
 * @property {string} req.body.name - The name of the trial.
 * @property {string} req.body.description - The description of the trial.
 * @property {string[]} req.body.centers - The centers of the trial.
 * @property {number} req.body.numOfVisits - The number of visits for this trial.
 * @returns {Trial}
 */
function update (req, res, next) {
    const trial = req.trial;

    trial.name = req.body.name;
    trial.description = req.body.description;
    trial.centers = req.body.centers;
    trial.numOfVisits = req.body.numOfVisits;

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
    trial.remove()
        .then(deletedTrial => res.json(deletedTrial))
        .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
