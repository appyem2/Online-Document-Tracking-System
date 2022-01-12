import path from 'path';
import User from '../models/user.js';
import Document from '../models/document.js';   

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