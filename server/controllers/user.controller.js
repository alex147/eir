import User from '../models/user.model';
import mongoose from 'mongoose';

/**
 * Load user and append to req.
 */
function load (req, res, next, id) {
    User.get(id)
        .then((user) => {
            req.user = user; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get (req, res) {
    return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.fullName - The fullName of user.
 * @property {string} req.body.role - The role of user.
 * @property {string} req.body.centers - The centers of user.
 * @property {string} req.body.trials - The trials of user.
 * @returns {User}
 */
function create (req, res, next) {
    const user = new User({
        _id: req.body.username,
        username: req.body.username,
        password: req.body.password,
        fullName: req.body.fullName,
        role: req.body.role,
        centers: req.body.centers,
        trials: req.body.trials,
    });

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.fullName - The fullName of user.
 * @property {string} req.body.role - The role of user.
 * @property {string} req.body.centers - The centers of user.
 * @property {string} req.body.trials - The trials of user.
 * @returns {User}
 */
function update (req, res, next) {
    const user = req.user;

    user.username = req.body.username;
    user.password = req.body.password;
    user.fullName = req.body.fullName;
    user.role = req.body.role;
    user.centers = req.body.centers;
    user.trials = req.body.trials;

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list (req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove (req, res, next) {
    const user = req.user;
    user.remove()
        .then(deletedUser => res.json(deletedUser))
        .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
