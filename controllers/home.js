import path from 'path';

export const getHome = function(req, res){
        res.render(path.resolve('./views/home.ejs'));
}

export const getForgotPassword1 = function(req, res){
        res.render(path.resolve('./views/forgot-pwd-1.ejs'));
}

export const getForgotPassword2 = function(req, res){
        res.render(path.resolve('./views/forgot-pwd-2.ejs'));
}

export const getForgotPassword3 = function(req, res){
        res.render(path.resolve('./views/forgot-pwd-3.ejs'));
}