import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import siteCtrl from '../controllers/site.controller';

const router = express.Router();

router.route('/')
  /** GET /api/sites - Get list of sites */
  .get(siteCtrl.list)

  /** POST /api/sites - Create new site */
  .post(validate(paramValidation.createSite), siteCtrl.create);

router.route('/:siteId')
  /** GET /api/sites/:siteId - Get site */
  .get(siteCtrl.get)

  /** PUT /api/sites/:siteId - Update site */
  .put(validate(paramValidation.updateSite), siteCtrl.update)

  /** DELETE /api/sites/:siteId - Delete site */
  .delete(siteCtrl.remove);

/** Load site when API with siteId route parameter is hit */
router.param('siteId', siteCtrl.load);

export default router;
