import Joi from 'joi';

export default {
    // POST /api/users
    createUser: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
            fullName: Joi.string().required(),
            role: Joi.string().required(),
            sites: Joi.array().required(),
            trials: Joi.array().required()
        }
    },

    // PUT /api/users/:userId
    updateUser: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
            fullName: Joi.string().required(),
            role: Joi.string().required(),
            sites: Joi.array().required(),
            trials: Joi.array().required()
        },
        params: {
            userId: Joi.string().required()
        }
    },

    // POST /api/trials
    createTrial: {
        body: {
            id: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            sites: Joi.array().required(),
            numOfVisits: Joi.number().required()
        }
    },

    // PUT /api/trials/:trialId
    updateTrial: {
        body: {
            id: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            sites: Joi.array().required(),
            numOfVisits: Joi.number().required()
        },
        params: {
            trialId: Joi.string().required()
        }
    },

    // POST /api/auth/login
    login: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required()
        }
    }
};
