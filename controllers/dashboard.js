import path from 'path';
import User from '../models/user.js';
import Document from '../models/document.js';   
import formidable from 'formidable';
import fs from 'fs';
import { copyFileSync } from 'fs';
import pkg from 'responselike';
const { from } = pkg;
//import { from } from 'responselike';


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
                        var documents=[];
                        var dates=[];
                        Document.find({_id: { $in:  user.pending }}, function(findErr, docs){
                                if(findErr) return handleError(findErr);
                                docs.forEach(doc=>{
                                        var obj={
                                                docid: doc,
                                                date: doc.documentBody[doc.documentBody.length-1].addedOn
                                        }
                                        dates.push(obj);
                                })
                                const sortedDates = dates.sort((a, b) => b.date - a.date);
                                sortedDates.forEach(d=>{
                                        documents.push(d.docid);
                                })
                                res.render(path.resolve('./views/pending.ejs'), {
                                        user: user, 
                                        docs: documents
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
                        var dates=[];
                        var dateIndex;
                        var documents=[];
                        Document.find({_id: { $in:  user.forwarded }},function(findErr, docs){
                                if(findErr) return handleError(findErr);

                                docs.forEach(doc=>{
                                        user.forwardedDocBodyIndex.forEach(index=>{
                                                if(doc._id.equals(index.documentID)){
                                                        dateIndex=index.documentIndex;
                                                }
                                        })
                                        var obj={doc: doc,
                                        date: doc.documentBody[dateIndex].addedOn}
                                        dates.push(obj);
                                })
                                const sortedDates = dates.sort((a, b) => b.date - a.date);
                                sortedDates.forEach(d=>{
                                        documents.push(d.doc);
                                })
                                var docBodyIndex=[];
                                var documentBodyIndex;
                                documents.forEach(doc=>{
                                        user.forwardedDocBodyIndex.forEach(index=>{
                                                if(doc._id.equals(index.documentID)){
                                                        documentBodyIndex=index.documentIndex;
                                                }
                                        })
                                        docBodyIndex.push(documentBodyIndex);
                                })
                                res.render(path.resolve('./views/forwarded.ejs'), {
                                        user: user, 
                                        docs: documents,
                                        docBodyIndex: docBodyIndex
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
                        var documents=[];
                        var dates=[];
                        Document.find({_id: { $in:  user.drafts }}, function(findErr, docs){
                                if(findErr) return handleError(findErr);
                                docs.forEach(doc=>{
                                        var obj={
                                                docid: doc,
                                                date: doc.documentBody[doc.documentBody.length-1].addedOn
                                        }
                                        dates.push(obj);
                                })
                                const sortedDates = dates.sort((a, b) => b.date - a.date);
                                sortedDates.forEach(d=>{
                                        documents.push(d.docid);
                                })
                                res.render(path.resolve('./views/drafts.ejs'), {
                                        user: user, 
                                        docs: documents
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
export const  getDocBodies = function (req, res){
        const userID = req.params.userID;
        const docID = req.params.docID;

        User.findById(userID, (err, user) => {

                if(err) return handleError(err);

                if(user){
                        var lastIndex=0;
                        Document.findById(docID, (err2, doc) => {
                                if(err2) return handleError(err2);

                                doc.documentBody.forEach((docBody, index) =>{
                                        
                                        User.findById(docBody.from.ID, (err3, fromUser)=>{
                                                docBody.from.ID = fromUser;

                                                
                                                User.findById(docBody.to.ID, (err4, toUser)=>{
                                                        docBody.to.ID = toUser;
                                                        
                                                        if(user.all.includes(docID)){

                                                                if(docBody.from.ID.equals(user._id) || docBody.to.ID.equals(user._id))
                                                                {
                                                                        lastIndex=Math.max(lastIndex,index);
                                                                }
                                                                if(index === doc.documentBody.length -1){
                                                                        
                                                                        var lastUserInTheChain = docBody.to.email == user.email;
                                                                        
                                                                        User.find({_id: {$ne: userID}}, (findErr, users)=>{
                                                                                
                                                                                res.render(path.resolve('./views/document.ejs'), {
                                                                                        document: doc,
                                                                                        user: user,
                                                                                        lastUser: lastUserInTheChain,
                                                                                        users: users,
                                                                                        lastIndex: lastIndex
                                                                                });  
                                                                        })   
                                                                }
   
                                                        }
                                                        
                                                        else{
                                                                res.render(path.resolve('./views/permission-denied.ejs'), {
                                                                        user:user
                                                                })
                                                        }
                                                        
                                                
                                                });
                                        });
                                        
                                })

                                
                                                        
                        })
                }
        });
}


// controller function to handle "Edit Profile" request
export const postEditProfile = function(req, res){
        
        const userID = req.params.userID;

        User.findById(userID, (err, user)=>{

                if(err) return handleError(err);

                if(user){
                        
                        const form = new formidable.IncomingForm();
                        const uploadFolder = path.resolve("./public/images/profile-pictures");
                        form.maxFileSize = 40 * 1024 * 1024; // 4MB
                        form.uploadDir = uploadFolder;  

                        form.parse(req, async function(err, fields, files){

                                const data = fields;
                                var fileName = "";
                                
                                if(files.profilePic.size){
                                
                                        const file = files.profilePic;
                                        const type = file.mimetype.split("/").pop();

                                        const validTypes = ["jpg", "jpeg", "png"];
                                        if (validTypes.indexOf(type) === -1) {
                                                return res.status(400).json({
                                                        status: "Fail",
                                                        message: "Upload Error: Corrupt File",
                                                        error: err,
                                                });
                                        }

                                        fileName = user._id + "." + type;
                                        fs.renameSync(file.filepath, path.join(uploadFolder, fileName)); 


                                        if (err) {
                                                console.log("Error parsing the profile picture image");
                                                return res.status(400).json({
                                                        status: "Fail",
                                                        message: "There was an error parsing the profile picture image",
                                                        error: err,
                                                });
                                        }

                                }
                                
                                User.findByIdAndUpdate(userID, 
                                        {
                                                prefix: data.prefix,
                                                firstName: data.firstName,
                                                middleName: data.middleName,
                                                lastName: data.lastName,
                                                group: data.group,
                                                department: data.department,
                                                designation: data.designation,
                                                profilePic: fileName
                                        }, 
                                        (updateErr, updatedUser) => {
                                        if(updateErr) return handleError(updateErr);
                                        
                                        res.redirect("/dashboard/"+ updatedUser._id);   

                                })

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

// controller function to handle "Create New Document" request
export const createNewDocument = function(req, res){

        const userID = req.params.userID;


        User.findById(userID, (err, user) => {
                if(err) return handleError(err);

                if(user){
                        const form = new formidable.IncomingForm();
                        const uploadFolder = path.resolve("./public/files");
                        form.maxFileSize = 40*1024*1024; // 4 MB
                        form.uploadDir = uploadFolder;
                        
                        
                        form.parse(req, async function(err, fields, files){
                                
                                var content = "";
                                var contentType = "";
                                const data = fields;

                                //console.log(files);

                                // No file is uploaded
                                if(files["input-file"]["size"] == 0){
                                        // If the user chooses "Text Entry"
                                        if(data.uploadType === '1'){content = data["input-text"]; contentType="text";}
                                        // If the user chooses "Hard Copy"
                                        else if(data.uploadType === '3'){content = data["input-text-default"]; contentType="text";}
                                }

                                // File size exceeds 4MB Size
                                else if(files["input-file"]["size"] > 40*1024*1024){
                                        return res.status(400).json({
                                                status: "Fail",
                                                message: "Upload Error: Maximum Size Limit Exceeded",
                                        })
                                }

                                // Succesful File Upload
                                else{
                                        
                                        const file = files["input-file"];
                                        const type = file.mimetype.split("/").pop();

                                        if(type != "pdf"){
                                                return res.status(400).json({
                                                        status: "Fail",
                                                        message: "Upload Error: Corrupt File Extension"
                                                });
                                        }

                                        const fileName = user._id +  Date.now() + "." + type;

                                        // If the user chooses "Pdf Upload"
                                        if(data.uploadType === '2'){content = fileName; contentType="file";}
                                        fs.renameSync(file.filepath, path.join(uploadFolder, fileName)); 

                                }
                                
                                User.findById(data.recipient, (err4, to_user)=>{
                                
                                // Create the new document      
                                const newDocument = new Document({
                                        subject: data.subject,
                                        author: userID,
                                        documentBody: [{
                                                from: {
                                                        ID: userID,
                                                        name: user.firstName+" "+user.middleName+" "+user.lastName,
                                                        email: user.email,
                                                },
                                                to: {
                                                        ID: data.recipient,
                                                        name: to_user.firstName+" "+to_user.middleName+" "+to_user.lastName,
                                                        email: to_user.email,
                                                },
                                                content: content,
                                                contentType: contentType
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
                                                        forwardedDocBodyIndex:{
                                                                documentID: newDocument._id,
                                                                documentIndex: 0
                                                        },
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
                        });

                        })
                        
                }
        })


}

// controller function to handle "Add Comment" request
export const addComment = function(req, res){

        const userID = req.params.userID;
        const docID = req.params.docID;


        User.findById(userID, (err, user) => {
                if(err) return handleError(err);

                if(user){
                        const form = new formidable.IncomingForm();
                        const uploadFolder = path.resolve("./public/files");
                        form.maxFileSize = 40*1024*1024; // 4 MB
                        form.uploadDir = uploadFolder;

                        form.parse(req, async function(err, fields, files){
                                
                                var content = "";
                                var contentType = "";
                                const data = fields;


                                // No file is uploaded
                                if(files["input-file"]["size"] == 0){
                                        // If the user chooses "Text Entry"
                                        if(data.uploadType === '1'){content = data["input-text"]; contentType="text";}
                                        // If the user chooses "Hard Copy"
                                        else if(data.uploadType === '3'){content = data["input-text-default"]; contentType="text";}
                                }

                                // File size exceeds 4MB Size
                                else if(files["input-file"]["size"] > 40*1024*1024){
                                        return res.status(400).json({
                                                status: "Fail",
                                                message: "Upload Error: Maximum Size Limit Exceeded",
                                        })
                                }

                                // Succesful File Upload
                                else{

                                        const file = files["input-file"];
                                        const type = file.mimetype.split("/").pop();

                                        if(type != "pdf"){
                                                return res.status(400).json({
                                                        status: "Fail",
                                                        message: "Upload Error: Corrupt File Extension"
                                                });
                                        }

                                        const fileName = user._id +  Date.now() + "." + type;

                                        // If the user chooses "Pdf Upload"
                                        if(data.uploadType === '2'){content = fileName; contentType="file";}
                                        fs.renameSync(file.filepath, path.join(uploadFolder, fileName)); 

                                }
                                
                                User.findById(data.recipient, (err4, to_user1)=>{
                                        

                                // Create the new comment      
                                const comment = {
                                        from: {
                                                ID: userID,
                                                name: user.firstName+" "+user.middleName+" "+user.lastName,
                                                email: user.email,
                                        },
                                        to: {
                                                ID: data.recipient,
                                                name: to_user1.firstName+" "+to_user1.middleName+" "+to_user1.lastName,
                                                email: to_user1.email,
                                        },
                                        content: content,
                                        contentType: contentType
                                }

                        
                                // If they opt to SEND NOW
                                if(data.send === "send"){

                                        Document.findByIdAndUpdate(docID, {$push:{documentBody: comment}}, function(updateErr, doc){
                                                if(updateErr) return handleError(updateErr);
                                                // Add the document to the user list
                                                
                                                User.findByIdAndUpdate(user.id, 
                                                { 
                                                        $push:{ 
                                                                forwarded: doc._id,
                                                                forwardedDocBodyIndex:{
                                                                        documentID: doc._id,
                                                                        documentIndex: doc.documentBody.length
                                                                },
                                                        },
                                                        $pull:{
                                                                pending: doc._id
                                                        }
                                                }, function(userUpdateErr, updatedUser){
                                                        if(userUpdateErr) return handleError(userUpdateErr);
                                                        User.findByIdAndUpdate(data.recipient,
                                                        { 
                                                                $addToSet: {
                                                                        pending: doc._id,
                                                                        all: doc._id
                                                                }
                                                        }, function(updateErr2, updatedUser2){
                                                                if(updateErr2) return handleError(updateErr2);
                                                                res.redirect("/dashboard/"+ user._id+"/forwarded");
                                                        })
                                                })

                                        })
                                        

                                }
                                // If they opt to SAVE LATER
                                // else if(data.save === "save"){
                                //         // Add the document to the user list
                                //         User.findByIdAndUpdate(user.id, 
                                //         { 
                                //                 $push:{ 
                                //                         drafts: newDocument._id , 
                                //                         all: newDocument._id
                                //                 },
                                //         }, function(updateErr, updatedUser){
                                //                 if(updateErr) return handleError(updateErr);
                                //                 res.redirect("/dashboard/"+ user._id+"/drafts");        
                                //         })

                                // }

                        });
                        })
                        
                }
        })


}

