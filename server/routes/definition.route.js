import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import definitionCtrl from '../controllers/definition.controller';

const router = express.Router();

router.route('/:trialId')
    /** GET /api/definitions/:trialId - Get visit definition */
    .get(definitionCtrl.get)

    /** POST /api/definitions/:trialId?visitId=<>&sectionId=<> - Create new section within the given trial and visit */
    .post(validate(paramValidation.createSection), definitionCtrl.create)

    /** PUT /api/definitions/:trialId?visitId=<>&sectionId=<> - Update a section within the given trial and visit */
    .put(validate(paramValidation.updateSection), definitionCtrl.update)

    /** DELETE /api/definitions/:trialId?visitId=<>&sectionId=<> - Delete section within the given trial and visit */
    .delete(definitionCtrl.remove);

router.route('/:trialId/section')
    /** GET /api/definitions/:trialId/section?visitId=<>&sectionId=<> - Get the section with the given ID for the given trial ID and visit ID */
    .get(definitionCtrl.getSection)

/** Load definition when API with trialId route parameter is hit */
router.param('trialId', definitionCtrl.load);

export default router;
