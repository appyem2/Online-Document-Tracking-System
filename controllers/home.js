import path from 'path';
import bodyParser from 'body-parser';
import User from '../models/user.js';

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
        User.find({email: email}, (err, users) => {


                if(err) return handleError(err);

                if(users.length == 0){
                        error = "Login Error: Email ID is not registered";      // User does not exist
                }else{
                        const user = users[0];
                        console.log(user);
                        if(user.password != password){
                                error = "Login Error: Password is incorrect";   // Password Mismatch
                        }else{
                                if(user.firstTime){
                                        // Logging in for the first time
                                        res.redirect("/dashboard/" + user.id + "/initial-setup");
                                }else{
                                        // Dashboard of the user
                                        res.redirect("/dashboard/" + user.id);
                                }
                        }
                }

                if(error != undefined){
                        res.render(path.resolve('./views/home.ejs'), {
                                error: error
                        });
                }
        })

        
}