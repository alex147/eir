import Site from '../models/site.model';
import mongoose from 'mongoose';

/**
 * Load site and append to req.
 */
function load (req, res, next, id) {
    Site.get(id)
        .then((site) => {
            req.site = site; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get site
 * @returns {Site}
 */
function get (req, res) {
    return res.json(req.site);
}

/**
 * Create new site
 * @property {string} req.body.id - The id of the site.
 * @property {string} req.body.name - The name of the site.
 * @property {string} req.body.country - The country of the site.
 * @property {string} req.body.lead - The lead investigator of the site.
 * @property {string} req.body.contacts - The contacts of the site.
 * @returns {Site}
 */
function create (req, res, next) {
    const site = new Site({
        _id: req.body.id,
        id: req.body.id,
        name: req.body.name,
        country: req.body.country,
        lead: req.body.lead,
        contacts: req.body.contacts,
    });

    site.save()
        .then(savedSite => res.json(savedSite))
        .catch(e => next(e));
}

/**
 * Update existing site
 * @property {string} req.body.id - The id of the site.
 * @property {string} req.body.name - The name of the site.
 * @property {string} req.body.country - The country of the site.
 * @property {string} req.body.lead - The lead investigator of the site.
 * @property {string} req.body.contacts - The contacts of the site.
 * @returns {Site}
 */
function update (req, res, next) {
    const site = req.site;

    site.name = req.body.name;
    site.country = req.body.country;
    site.lead = req.body.lead;
    site.contacts = req.body.contacts;

    site.save()
        .then(savedSite => res.json(savedSite))
        .catch(e => next(e));
}

/**
 * Get site list.
 * @property {number} req.query.skip - Number of sites to be skipped.
 * @property {number} req.query.limit - Limit number of sites to be returned.
 * @returns {Site[]}
 */
function list (req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Site.list({ limit, skip })
        .then(sites => res.json(sites))
        .catch(e => next(e));
}

/**
 * Delete site.
 * @returns {Site}
 */
function remove (req, res, next) {
    const site = req.site;
    site.remove()
        .then(deletedSite => res.json(deletedSite))
        .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
