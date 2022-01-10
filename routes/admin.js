import express from 'express';
import { getAddNewUser } from '../controllers/admin.js';

const router = express.Router();

router.get("/add-new-user", getAddNewUser);

export default router;