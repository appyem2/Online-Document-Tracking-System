import express from 'express';
import {getHome, getAdminLogin, getForgotPassword1, getForgotPassword2, getForgotPassword3, postLogin} from '../controllers/home.js';

const router = express.Router();

router.get("/", getHome);
router.get("/admin-login", getAdminLogin);
router.get("/forgot-password-1", getForgotPassword1);
router.get("/forgot-password-2", getForgotPassword2);
router.get("/forgot-password-3", getForgotPassword3);

router.post("/login", postLogin);

export default router;