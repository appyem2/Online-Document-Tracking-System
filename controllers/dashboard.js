import path from 'path';

export const getDashboard = function(req, res){
        res.render(path.resolve('./views/dashboard.ejs'));
}

export const getPending = function(req, res){
        res.render(path.resolve('./views/pending.ejs'));
}

export const getForwarded = function(req, res){
        res.render(path.resolve('./views/forwarded.ejs'));
}

export const getDrafts = function(req, res){
        res.render(path.resolve('./views/drafts.ejs'));
}

export const getAuthored = function(req, res){
        res.render(path.resolve('./views/authored.ejs'));
}

export const getResolved = function(req, res){
        res.render(path.resolve('./views/resolved.ejs'));
}

export const getAllDocuments = function(req, res){
        res.render(path.resolve('./views/all-documents.ejs'));
}

export const getCreateNewDoc = function(req, res){
        res.render(path.resolve('./views/create-new-doc.ejs'));
}



