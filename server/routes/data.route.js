import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import dataCtrl from '../controllers/data.controller';

const router = express.Router();

router.route('/')
    /** GET /api/data?siteId=<> - Get site data */
    .get(dataCtrl.getDataBySiteId)

router.route('/:subjectId')
    /** GET /api/data/:subjectId?visitId=<>&sectionId=<> - Get a section data entry */
    .get(dataCtrl.getSectionData)

    /** PUT /api/data/:subjectId?visitId=<>&sectionId=<> - Update a section data entry */
    .put(validate(paramValidation.updateSectionData), dataCtrl.update);

/** Load definition when API with trialId route parameter is hit */
router.param('subjectId', dataCtrl.load);

export default router;
