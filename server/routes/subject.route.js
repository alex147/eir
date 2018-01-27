import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import subjectCtrl from '../controllers/subject.controller';

const router = express.Router();

router.route('/')
  /** GET /api/subjects?trialId=<>&siteId=<> - Get the list of subjects for the given trial ID and site ID */
  .get(subjectCtrl.getByTrialAndSiteId)

  /** POST /api/subjects - Create new subject */
  .post(validate(paramValidation.createSubject), subjectCtrl.create);

router.route('/:subjectId')
  /** GET /api/subjects/:subjectId - Get subject */
  .get(subjectCtrl.get)

  /** PUT /api/subjects/:subjectId - Update subject */
  .put(validate(paramValidation.updateSubject), subjectCtrl.update)

  /** DELETE /api/subjects/:subjectId - Delete subject */
  .delete(subjectCtrl.remove);

/** Load subject when API with subjectId route parameter is hit */
router.param('subjectId', subjectCtrl.load);

export default router;
