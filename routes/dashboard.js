import express from 'express';
import {getPending, getForwarded, getDrafts, getResolved, getAuthored, getAllDocuments} from '../controllers/dashboard.js';

const router = express.Router();

router.get("/", getPending);
router.get("/pending", getPending);
router.get("/forwarded", getForwarded);
router.get("/drafts", getDrafts);
router.get("/authored", getAuthored);
router.get("/resolved", getResolved);
router.get("/all-documents", getAllDocuments);


export default router;