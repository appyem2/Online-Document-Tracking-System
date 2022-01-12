import path from 'path';
import User from '../models/user.js';
import Document from '../models/document.js';   

// controller function to render "First Time Login Page"
export const getSignInFirstTime = function(req, res){
        const userID = req.params.userID;
        
        User.findById(userID, (err, user) => {
                
                if(err) return handleError(err);

                if(user){
                        res.render(path.resolve('./views/initial-setup.ejs'), {
                                user: user, 
                        });
                }
        })
}

// controller function to render "User Dashboard"
export const getDashboard = function(req, res){
        const userID = req.params.userID;
        
        User.findById(userID, (err, user) => {
                
                if(err) return handleError(err);

                if(user){


                        Document.find({_id: { $in:  user.pending }}, function(findErr, docs){
                                if(findErr) return handleError(findErr);
                                res.render(path.resolve('./views/dashboard.ejs'), {
                                        user: user, 
                                        docs: docs
                                });
                        })
                        
                }
        })
}

// controller function to render "Pending Documents Dashboard"
export const getPending = function(req, res){
        const userID = req.params.userID;
        
        User.findById(userID, (err, user) => {
                
                if(err) return handleError(err);

                if(user){

                        Document.find({_id: { $in:  user.pending }}, function(findErr, docs){
                                if(findErr) return handleError(findErr);
                                res.render(path.resolve('./views/pending.ejs'), {
                                        user: user, 
                                        docs: docs
                                });
                        })
                }
        })
}

// controller function to render "Forwarded Documents Dashboard"
export const getForwarded = function(req, res){
        const userID = req.params.userID;
        
        User.findById(userID, (err, user) => {
                
                if(err) return handleError(err);

                if(user){

                        Document.find({_id: { $in:  user.forwarded }}, function(findErr, docs){
                                if(findErr) return handleError(findErr);
                                res.render(path.resolve('./views/forwarded.ejs'), {
                                        user: user, 
                                        docs: docs
                                });
                        })
                }
        })
}

// controller function to render "Drafts Dashboard"
export const getDrafts = function(req, res){
        const userID = req.params.userID;
                
        User.findById(userID, (err, user) => {
                
                if(err) return handleError(err);

                if(user){
                        Document.find({_id: { $in:  user.drafts }}, function(findErr, docs){
                                if(findErr) return handleError(findErr);
                                res.render(path.resolve('./views/drafts.ejs'), {
                                        user: user, 
                                        docs: docs
                                });
                        })
                }
        })
}

// controller function to render "Authored Documents Dashboard"
export const getAuthored = function(req, res){
        const userID = req.params.userID;
               
        User.findById(userID, (err, user) => {
                
                if(err) return handleError(err);

                if(user){
                        Document.find({_id: { $in:  user.authored }}).sort({createdOn: "desc"}).exec(function(findErr, docs){
                                if(findErr) return handleError(findErr);


                                res.render(path.resolve('./views/authored.ejs'), {
                                        user: user, 
                                        docs: docs
                                });
                        })
                }
        })
}

// controller function to render "Resolved Documents Dashboard"
export const getResolved = function(req, res){
        const userID = req.params.userID;
                
        User.findById(userID, (err, user) => {
                
                if(err) return handleError(err);

                if(user){
                        Document.find({_id: { $in:  user.resolved }}).exec(function(findErr, docs){
                                if(findErr) return handleError(findErr);

                                res.render(path.resolve('./views/resolved.ejs'), {
                                        user: user, 
                                        docs: docs
                                });
                        })
                }
        })
}

// controller function to render "All Documents Dashboard"
export const getAllDocuments = function(req, res){
        const userID = req.params.userID;
                
        User.findById(userID, (err, user) => {
                
                if(err) return handleError(err);

                if(user){
                        Document.find({_id: { $in:  user.all }}, function(findErr, docs){
                                if(findErr) return handleError(findErr);

                                res.render(path.resolve('./views/all-documents.ejs'), {
                                        user: user, 
                                        docs: docs
                                });
                        })
                }
        })
}

// controller function to render "Create New Document"
export const getCreateNewDoc = function(req, res){
        const userID = req.params.userID;
                
        User.findById(userID, (err, user) => {
                
                if(err) return handleError(err);

                if(user){
                        User.find({_id: {$ne: userID}}, (errUsers, users) => {
                                if(errUsers) return handleError(errUsers);
                                res.render(path.resolve('./views/create-new-doc.ejs'), {
                                        user: user, 
                                        users: users
                                });
                        })
                }
        })
}

// controller function to render "Edit Profile"
export const getEditProfile = function (req, res){
        const userID = req.params.userID;
        
        User.findById(userID, (err, user) => {
                
                if(err) return handleError(err);

                if(user){
                        res.render(path.resolve('./views/edit-profile.ejs'), {
                                user: user, 
                        });
                }
        })
}

// controller function to render "Edit Password"
export const getEditPassword = function (req, res){
        const userID = req.params.userID;
        
        User.findById(userID, (err, user) => {
                
                if(err) return handleError(err);

                if(user){
                        res.render(path.resolve('./views/edit-password.ejs'), {
                                user: user, 
                        });
                }
        })
}

// controller function to render "Document Bodies"
export const getDocBodies = function (req, res){
        const userID = req.params.userID;
        const docID = req.params.docID;

        User.findById(userID, (err, user) => {

                if(err) return handleError(err);

                if(user){
                        Document.findById(docID, (err2, doc) => {
                                if(err2) return handleError(err2);

                                doc.documentBody.forEach(docBody =>{
                                        User.findById(docBody.from, (err3, fromUser)=>{
                                                docBody.from = fromUser;

                                                
                                                User.findById(docBody.to, (err4, toUser)=>{
                                                        docBody.to = toUser;

                                                        if(user.all.includes(docID)){
                                                                res.render(path.resolve('./views/document.ejs'), {
                                                                        document: doc,
                                                                        user: user,
                                                                });        
                                                        }else{
                                                                res.render(path.resolve('./views/permission-denied.ejs'), {
                                                                        user:user
                                                                })
                                                        }
                                                        
                                                })
                                        });
                                })
                                
                        })
                }
        })
}


// controller function to handle "Edit Profile" request
export const postEditProfile = function(req, res){
        const data = req.body;
        const userID = req.params.userID;

        User.findById(userID, (err, user)=>{

                if(err) return handleError(err);

                if(user){
                        User.findByIdAndUpdate(userID, 
                                {
                                        prefix: data.prefix,
                                        firstName: data.firstName,
                                        middleName: data.middleName,
                                        lastName: data.lastName,
                                        group: data.group,
                                        department: data.department,
                                        designation: data.designation,
                                        profilePic: data.profilePic
                                }, 
                                (updateErr, updatedUser) => {
                                if(updateErr) return handleError(updateErr);
                                
                                if(updatedUser.firstTime){
                                        res.render(path.resolve('./views/initial-setup.ejs'),{
                                                user: updatedUser,
                                                step: 2
                                        })
                                } else{
                                        res.render(path.resolve('./views/dashboard.ejs'),{
                                                user: updatedUser,
                                        })
                                }

                        })
                }
        })
        
}

// controller function to handle "Edit Password" request
export const postEditPassword = function(req, res){
        const data = req.body;
        const userID = req.params.userID;
        
        User.findById(userID, (err, user)=>{

                if(err) return handleError(err);

                if(user){
                        User.findByIdAndUpdate(userID, {password: data.password, firstTime: false}, (updateErr, updatedUser) => {
                                if(updateErr) return handleError(updateErr);

                                res.redirect("/dashboard/" + updatedUser._id);
                        })
                }
        })

}

// controller function to hadle "Create New Document" request
export const createNewDocument = function(req, res){

        const data = req.body;
        const userID = req.params.userID;


        User.findById(userID, (err, user) => {
                if(err) return handleError(err);

                if(user){

                        var content = "";

                        // If the user chooses "Text Entry"
                        if(data.uploadType === '1'){content = data["input-text"];}
                        // If the user chooses "Hard Copy"
                        else if(data.uploadType === '3'){content = data["input-text-default"]}
                
                        // Create the new document      
                        const newDocument = new Document({
                                subject: data.subject,
                                author: userID,
                                documentBody: [{
                                        from: userID,
                                        to: data.recipient,
                                        content: content,
                                }],
                        });

                        // Save the new document
                        newDocument.save();

                        
                        // If they opt to SEND NOW
                        if(data.send === "send"){
                                // Add the document to the user list
                                User.findByIdAndUpdate(user.id, 
                                { 
                                        $push:{ 
                                                forwarded: newDocument._id , 
                                                authored: newDocument._id,
                                                all: newDocument._id
                                        },
                                }, function(updateErr, updatedUser){
                                        if(updateErr) return handleError(updateErr);
                                        User.findByIdAndUpdate(data.recipient,
                                        { 
                                                $push: {
                                                        pending: newDocument._id,
                                                        all: newDocument._id
                                                }
                                        }, function(updateErr2, updatedUser2){
                                                if(updateErr2) return handleError(updateErr2);
                                                res.redirect("/dashboard/"+ user._id+"/authored");
                                        })
                                })

                        }
                        // If they opt to SAVE LATER
                        else if(data.save === "save"){
                                // Add the document to the user list
                                User.findByIdAndUpdate(user.id, 
                                { 
                                        $push:{ 
                                                drafts: newDocument._id , 
                                                all: newDocument._id
                                        },
                                }, function(updateErr, updatedUser){
                                        if(updateErr) return handleError(updateErr);
                                        res.redirect("/dashboard/"+ user._id+"/drafts");        
                                })

                        }

                        
                        
                        
                }
        })


}

