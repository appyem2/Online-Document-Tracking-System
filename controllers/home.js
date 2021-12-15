import path from 'path';
import User from '../models/user.js';

// controller function to render "Home Page"
export const getHome = function(req, res){

        // Manually adding an user to the list of users
        // const user = new User({
        //         email: "510818032.aparajita@students.iiests.ac.in",
        //         password: "510818032",
        //         firstTime: true,
        //         prefix: "",
        //         firstName: "",
        //         middleName: "",
        //         lastName: "",
        //         group: "",
        //         department: "",
        //         designation: "",
        //         profilePic: "",
        //         pending: [],
        //         forwarded: [],
        //         drafts: [],
        //         authored: [],
        //         resolved: [],
        //         all: []
        // });
        // user.save();

        res.render(path.resolve('./views/home.ejs'), {
                error: undefined,
        });
}

// controller function to render "Forgot Password Page 1"
export const getForgotPassword1 = function(req, res){
        res.render(path.resolve('./views/forgot-pwd-1.ejs'));
}

// controller function to render "Forgot Password Page 2"
export const getForgotPassword2 = function(req, res){
        res.render(path.resolve('./views/forgot-pwd-2.ejs'));
}

// controller function to render "Forgot Password Page 3"
export const getForgotPassword3 = function(req, res){
        res.render(path.resolve('./views/forgot-pwd-3.ejs'));
}

// controller function to handle "Login" Request
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