import express from 'express';
import { getAddNewUser, getActiveUsers, addNewUser } from '../controllers/admin.js';

const router = express.Router();

router.get("/", getActiveUsers);
router.get("/add-new-user", getAddNewUser);

router.post("/add-new-user", addNewUser);

export default router;