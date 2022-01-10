import path from 'path';
import User from '../models/user.js';
import Document from '../models/document.js';   

// Controller function to render "Add New User" page
export const getAddNewUser = function(req, res){
        res.render(path.resolve('./views/add-user.ejs'));
}