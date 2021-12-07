import path from 'path';
import users from '../users.js';
import documents from '../documents.js';
import bodyParser from 'body-parser';
import e from 'express';

export const getHome = function(req, res){
        res.render(path.resolve('./views/home.ejs'), {
                error: undefined,
        });
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

export const postLogin = function(req, res){

        const email = req.body.email;
        const password = req.body.password;
        var error = undefined;

        // Find the user using the email ID
        const userFound = users.find((user) => user.email === email);


        if(userFound === undefined){
                error = "Login Error: Email ID is not registered";      // User does not exist
        }else{
                if(userFound.password != password){
                        error = "Login Error: Password is incorrect";   // Password Mismatch
                }else{
                        if(userFound.firstTime){
                                // Logging in for the first time
                                console.log("Loggin in for the first time");
                                res.redirect("/dashboard/" + userFound.id);
                        }else{
                                // Dashboard of the user
                                res.redirect("/dashboard/" + userFound.id);
                        }
                }
        }

        if(error != undefined){
                res.render(path.resolve('./views/home.ejs'), {
                        error: error
                });
        }
}