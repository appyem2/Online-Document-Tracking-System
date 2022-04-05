import path from 'path';
import User from '../models/user.js';
import nodemailer from 'nodemailer';

// Controller function to render "Add New User" page
export const getAddNewUser = function(req, res){
        res.render(path.resolve('./views/add-user.ejs'), {
                message: undefined
        });
}

// Controller function to render "Active Users" page
export const getActiveUsers = function(req, res){

           
        User.find({}, function(err, users){
                if(err) return handleError(err);
                res.render(path.resolve('./views/admin-dashboard.ejs'), {
                        users: users,
                });   
        })
}

// Controller function to add a new user to the system
export const addNewUser = function(req, res){
        
        const body = req.body;

        User.find({email: body.email}, function(err, usersFound){
                
                if(usersFound.length == 0){
                        const user = new User({
                                email: body.email,
                                password: body.password,
                                firstTime: true,
                                prefix: body.prefix,
                                firstName: body.firstName,
                                middleName: body.middleName,
                                lastName: body.lastName,
                                group: body.group,
                                department: body.department,
                                designation: body.designation,
                                profilePic: "",
                                pending: [],
                                forwarded: [],
                                drafts: [],
                                authored: [],
                                resolved: [],
                                all: []
                        });
                        user.save();

                        // the mail sending system
                        
                        let mailTransporter=nodemailer.createTransport({
                                service:'gmail',
                                auth:{
                                        user:'',                //sender address
                                        pass:''                 //sender password
                                }
                        });

                        let name= user.prefix+' '+user.lastName;

                        let mailDetails={
                                from:'510818012.soumili@students.iiests.ac.in',
                                to: user.email,
                                subject: 'Sign Up Successful',
                                html: '<p><h2>Hello '+ name +',</h2> You have been signed up succesfully for Online Documentation System.<br> Please sign in with your registered email id.<br>Given Password: <strong>' + user.password +'</strong></p2>'
                        };

                        mailTransporter.sendMail(mailDetails,function(err,data) {
                                if(err){
                                        console.log('Error Occurs');
                                }else{
                                        console.log('Email sent');
                                }
                        });



                        res.render(path.resolve('./views/add-user.ejs'), {
                                message: "Successfully Added: " + user.email,
                                type: "Success"
                        });
                }
                
                else{
                        res.render(path.resolve('./views/add-user.ejs'), {
                                message: "ERROR: Account Already Exists with " + usersFound[0].email,
                                type: "Failure"
                        });
                }
        })
        


        
}