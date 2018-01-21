import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import trialRoutes from './trial.route';
import siteRoutes from './site.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount trial routes at /trials
router.use('/trials', trialRoutes);

// mount site routes at /sites
router.use('/sites', siteRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
