'use strict';
import express from 'express';
import { validation } from '../../config/validator.js';
import validateBody from '../../middleware/validation.js';
import { create,login,verifyEmail,updateAccount,getAllAccountDetails,getAccountDetailsById,deleteAccount, logout} from './account.controller.js';



const router = express.Router();
router.post('/create',validation(validateBody.account.create),create);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify', verifyEmail);
router.put('/update/:id', updateAccount);
router.get('/get', getAllAccountDetails);
router.get('/get/:id',getAccountDetailsById)
router.delete('/delete/:id', deleteAccount)

export default router;