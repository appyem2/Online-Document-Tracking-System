import express from 'express';
import {getPending, getForwarded, getDrafts, getResolved, getAuthored, getAllDocuments, getCreateNewDoc} from '../controllers/dashboard.js';

const router = express.Router();

router.get("/", getPending);
router.get("/pending", getPending);
router.get("/forwarded", getForwarded);
router.get("/drafts", getDrafts);
router.get("/authored", getAuthored);
router.get("/resolved", getResolved);
router.get("/all-documents", getAllDocuments);
router.get("/create-new-doc", getCreateNewDoc);


export default router;