import express from 'express';

const router = express.Router();

router.get("/", function(req, res){
        res.send("<h1>This is the home page</h1>");
});

export default router;