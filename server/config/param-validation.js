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

    // POST /api/sites
    createSite: {
        body: {
            id: Joi.string().required(),
            name: Joi.string().required(),
            country: Joi.string().required(),
            lead: Joi.string().required(),
            contacts: Joi.string().required()
        }
    },

    // PUT /api/sites/:siteId
    updateSite: {
        body: {
            id: Joi.string().required(),
            name: Joi.string().required(),
            country: Joi.string().required(),
            lead: Joi.string().required(),
            contacts: Joi.string().required()
        },
        params: {
            siteId: Joi.string().required()
        }
    },

    // POST /api/subjects
    createSubject: {
        body: {
            id: Joi.string().required(),
            consentDate: Joi.date().required(),
            gender: Joi.string().required(),
            isActive: Joi.boolean().required(),
            status: Joi.string().required(),
            statusDate: Joi.date().required(),
            trialId: Joi.string().required(),
            siteId: Joi.string().required(),
            completedVisits: Joi.number().required()
        }
    },

    // PUT /api/subjects/:subjectId
    updateSubject: {
        body: {
            id: Joi.string().required(),
            consentDate: Joi.date().required(),
            gender: Joi.string().required(),
            isActive: Joi.boolean().required(),
            status: Joi.string().required(),
            statusDate: Joi.date().required(),
            trialId: Joi.string().required(),
            siteId: Joi.string().required(),
            completedVisits: Joi.number().required()
        },
        params: {
            subjectId: Joi.string().required()
        }
    },

    // POST /api/definitions/:trialId
    createSection: {
        body: {
            id: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            questions: Joi.array().required()
        },
        params: {
            trialId: Joi.string().required()
        }
    },

    // PUT /api/definitions/:trialId
    updateSection: {
        body: {
            id: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            questions: Joi.array().required()
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
