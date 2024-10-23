import express from 'express';
import { Router } from 'express';
import { createContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController, putContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

const jsonParser = express.json()

router.get('/contacts', ctrlWrapper(getAllContactsController))
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController))
router.post('/contacts', jsonParser, validateBody(createContactSchema), ctrlWrapper(createContactController))
router.put('/contacts/:contactId', isValidId, jsonParser, ctrlWrapper(putContactController))
router.patch('/contacts/:contactId', isValidId, jsonParser, validateBody(updateContactSchema), ctrlWrapper(patchContactController))
router.delete('/contacts/:contactId', isValidId, jsonParser, ctrlWrapper(deleteContactController));


export default router;