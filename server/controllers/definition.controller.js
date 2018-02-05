import TrialDefinition from '../models/trial-definition.model';
import SectionDefinition from '../models/section-definition.model';
import mongoose from 'mongoose';

/**
 * Load definition and append to req.
 */
function load (req, res, next, trialId) {
    TrialDefinition.get(trialId)
        .then((definition) => {
            req.definition = definition; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
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

    res.json(definition.visitDefinitions[visitId].sections.id(sectionId));
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

    const section = new SectionDefinition({
        _id: req.body.id,
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        questions: req.body.questions,
    });

    definition.visitDefinitions[visitId].sections.push(section);
    definition.save()
        .then(savedDefinition => console.log("Added a section in", savedDefinition.id))
        .catch(e => next(e));
    res.json(section);
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

    var section = definition.visitDefinitions[visitId].sections.id(sectionId);
    section.id = req.body.id
    section.name = req.body.name
    section.description = req.body.description
    section.questions = req.body.questions


    definition.save()
        .then(savedDefinition => console.log("Updated a section in", savedDefinition.id))
        .catch(e => next(e));

    res.json(section);
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

    definition.visitDefinitions[visitId].sections
        .id(sectionId).remove()
        .then(deletedSection => res.json(deletedSection))
        .catch(e => next(e));

    definition.save()
        .then(savedDefinition => console.log("Removed a section from", savedDefinition.id))
        .catch(e => next(e));
}

export default { load, get, getSection, create, update, list, remove };
