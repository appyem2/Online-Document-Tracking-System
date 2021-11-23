import express from 'express';
import {getHome, getForgotPassword1, getForgotPassword2, getForgotPassword3} from '../controllers/home.js';

const router = express.Router();

router.get("/", getHome);
router.get("/forgot-password-1", getForgotPassword1);
router.get("/forgot-password-2", getForgotPassword2);
router.get("/forgot-password-3", getForgotPassword3);

export default router;