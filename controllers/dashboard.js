import path from 'path';
import users from '../users.js';
import documents from '../documents.js';
import bodyParser from 'body-parser';

export const getDashboard = function(req, res){
        const userID = req.params.userID;
        const user = users.find((userFound) => userFound.id === userID);
        if(user != undefined){
                res.render(path.resolve('./views/dashboard.ejs'), {
                        user: user
                });
        }
}

export const getPending = function(req, res){
        const userID = req.params.userID;
        const user = users.find((userFound) => userFound.id === userID);
        if(user != undefined){
                res.render(path.resolve('./views/pending.ejs'), {
                        user: user
                });
        }
}

export const getForwarded = function(req, res){
        const userID = req.params.userID;
        const user = users.find((userFound) => userFound.id === userID);
        if(user != undefined){
                res.render(path.resolve('./views/forwarded.ejs'), {
                        user: user
                });
        }
}

export const getDrafts = function(req, res){
        const userID = req.params.userID;
        const user = users.find((userFound) => userFound.id === userID);
        if(user != undefined){
                res.render(path.resolve('./views/drafts.ejs'), {
                        user: user
                });
        }
}

export const getAuthored = function(req, res){
        const userID = req.params.userID;
        const user = users.find((userFound) => userFound.id === userID);
        if(user != undefined){
                res.render(path.resolve('./views/authored.ejs'), {
                        user: user
                });
        }
}

export const getResolved = function(req, res){
        const userID = req.params.userID;
        const user = users.find((userFound) => userFound.id === userID);
        if(user != undefined){
                res.render(path.resolve('./views/resolved.ejs'), {
                        user: user
                });
        }
}

export const getAllDocuments = function(req, res){
        const userID = req.params.userID;
        const user = users.find((userFound) => userFound.id === userID);
        if(user != undefined){
                res.render(path.resolve('./views/all-documents.ejs'), {
                        user: user
                });
        }
}

export const getCreateNewDoc = function(req, res){
        const userID = req.params.userID;
        const user = users.find((userFound) => userFound.id === userID);
        if(user != undefined){
                res.render(path.resolve('./views/create-new-doc.ejs'), {
                        user: user
                });
        }
}



