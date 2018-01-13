import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import trialCtrl from '../controllers/trial.controller';

const router = express.Router();

router.route('/')
  /** GET /api/trials - Get list of trials */
  .get(trialCtrl.list)

  /** POST /api/trials - Create new trial */
  .post(validate(paramValidation.createTrial), trialCtrl.create);

router.route('/:trialId')
  /** GET /api/trials/:trialId - Get trial */
  .get(trialCtrl.get)

  /** PUT /api/trials/:trialId - Update trial */
  .put(validate(paramValidation.updateTrial), trialCtrl.update)

  /** DELETE /api/trials/:trialId - Delete trial */
  .delete(trialCtrl.remove);

/** Load trial when API with trialId route parameter is hit */
router.param('trialId', trialCtrl.load);

export default router;
