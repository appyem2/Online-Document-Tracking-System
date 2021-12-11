import express from 'express';
import {getPending, getForwarded, getDrafts, getResolved, getAuthored, getAllDocuments, getCreateNewDoc, getDashboard, getSignInFirstTime, postEditProfile, postEditPassword} from '../controllers/dashboard.js';

const router = express.Router();

router.get("/:userID", getDashboard);
router.get("/:userID/pending", getPending);
router.get("/:userID/forwarded", getForwarded);
router.get("/:userID/drafts", getDrafts);
router.get("/:userID/authored", getAuthored);
router.get("/:userID/resolved", getResolved);
router.get("/:userID/all-documents", getAllDocuments);
router.get("/:userID/create-new-doc", getCreateNewDoc);
router.get("/:userID/initial-setup", getSignInFirstTime);

router.post("/:userID/edit-profile", postEditProfile);
router.post("/:userID/edit-password", postEditPassword);



export default router;