import TrialDefinition from '../models/trial-definition.model';
import SectionDefinition from '../models/section-definition.model';
import mongoose from 'mongoose';

/**
 * Load definition and append to req.
 */
function load (req, res, next, trialId) {
    TrialDefinition.findOne({ 'id': trialId })
        .populate({
            path: 'visitDefinitions',
            populate: {
                path: 'sections'
            }
        })
        .exec(function (err, definition) {
            console.log(definition);
            req.definition = definition; // eslint-disable-line no-param-reassign
            return next();
        });
}

/**
 * Get definition
 * @returns {TrialDefinition}
 */
function get (req, res) {
    return res.json(req.definition);
}

/**
 * Get section definition.
 * @returns {SectionDefinition}
 */
function getSection (req, res) {
    const definition = req.definition;
    const visitId = req.query.visitId - 1;
    const sectionId = req.query.sectionId;

    TrialDefinition.findOne({ 'id': definition.id })
        .populate({
            path: 'visitDefinitions',
            populate: {
                path: 'sections'
            }
        }).exec(function (err, def) {
            res.json(def.visitDefinitions[visitId].sections[0]);
        });
}

/**
 * Create new definition
 * @property {string} req.body.id - The id of the section.
 * @property {string} req.body.name - The name of the section.
 * @property {string} req.body.description - The description of the section.
 * @property {Question[]} req.body.questions - The questions for this section.
 * @returns {SectionDefinition}
 */
function create (req, res, next) {
    const definition = req.definition;
    const visitId = req.query.visitId - 1;
    const sectionId = req.query.sectionId;

    const section = new SectionDefinition({
        _id: req.body.id,
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        questions: req.body.questions,
    });

    TrialDefinition.findOne({ 'id': definition.id })
        .populate({
            path: 'visitDefinitions',
            populate: {
                path: 'sections'
            }
        }).exec(function (err, def) {
            def.visitDefinitions[visitId].sections.push(section);
            // def.visitDefinitions[visitId].sections.save(function (){});
            def.visitDefinitions[visitId].save(function () { });
            // def.save(function (){});
            def.save()
                .then(savedDefinition => console.log("Added a section in", savedDefinition.id))
                .catch(e => next(e));
            res.json(section);
        });
}

/**
 * Update existing definition
 * @property {string} req.body.id - The id of the section.
 * @property {string} req.body.name - The name of the section.
 * @property {string} req.body.description - The description of the section.
 * @property {Question[]} req.body.questions - The questions for this section.
 * @returns {SectionDefinition}
 */
function update (req, res, next) {
    const definition = req.definition;
    const visitId = req.query.visitId - 1;
    const sectionId = req.query.sectionId;
    const section = {};

    TrialDefinition.findOne({ 'id': definition.id })
        .populate({
            path: 'visitDefinitions',
            populate: {
                path: 'sections'
            }
        }).exec(function (err, def) {
            var section = def.visitDefinitions[visitId].sections[0];
            section.id = req.body.id
            section.name = req.body.name
            section.description = req.body.description
            section.questions = req.body.questions
            def.visitDefinitions[visitId].sections[0] = section;
            res.json(section);
        });

    definition.save()
        .then(savedDefinition => console.log("Updated a section in", savedDefinition.id))
        .catch(e => next(e));
}

/**
 * Get definition list.
 * @property {number} req.query.skip - Number of definitions to be skipped.
 * @property {number} req.query.limit - Limit number of definitions to be returned.
 * @returns {TrialDefinition[]}
 */
function list (req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    TrialDefinition.list({ limit, skip })
        .then(definitions => res.json(definitions))
        .catch(e => next(e));
}

/**
 * Delete definition.
 * @returns {SectionDefinition}
 */
function remove (req, res, next) {
    const definition = req.definition;
    const visitId = req.query.visitId - 1;
    const sectionId = req.query.sectionId;

    TrialDefinition.findOne({ 'id': definition.id })
        .populate({
            path: 'visitDefinitions',
            populate: {
                path: 'sections'
            }
        }).exec(function (err, def) {
            def.visitDefinitions[visitId].sections[0].remove()
                .then(deletedSection => res.json(deletedSection))
                .catch(e => next(e));
        });

    definition.save()
        .then(savedDefinition => console.log("Removed a section from", savedDefinition.id))
        .catch(e => next(e));
}

export default { load, get, getSection, create, update, list, remove };
