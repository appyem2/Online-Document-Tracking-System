import express from 'express';
import {getPending, getForwarded, getDrafts, getResolved, getAuthored, getAllDocuments, getCreateNewDoc, getDashboard} from '../controllers/dashboard.js';

const router = express.Router();

router.get("/:userID", getDashboard);
router.get("/:userID/pending", getPending);
router.get("/:userID/forwarded", getForwarded);
router.get("/:userID/drafts", getDrafts);
router.get("/:userID/authored", getAuthored);
router.get("/:userID/resolved", getResolved);
router.get("/:userID/all-documents", getAllDocuments);
router.get("/:userID/create-new-doc", getCreateNewDoc);


export default router;