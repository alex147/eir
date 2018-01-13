import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      fullName: Joi.string().required(),
      role: Joi.string().required(),
      centers: Joi.array().required(),
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
        centers: Joi.array().required(),
        trials: Joi.array().required()
      },
    params: {
      userId: Joi.string().required()
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
