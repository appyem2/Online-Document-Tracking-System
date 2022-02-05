// Import the necessary packages
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Routes
import homeRoutes from './routes/home.js';
import dashboardRoutes from './routes/dashboard.js';
import adminRoutes from './routes/admin.js';

// Initialize and set the express app
const app = express();
app.set("view engine", "ejs");
app.set('views',path.join(__dirname+'/views/'));
app.use(express.static("public"));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

// Setup the routes
app.use('/', homeRoutes);
app.use("/dashboard/", dashboardRoutes);
app.use("/admin/", adminRoutes);

// Listen to Port 3000
const port = process.env.PORT || 8080;

// Setup the MongoDB database
const CONNECTION_URL = "mongodb+srv://"+"admin-souradip"+":"+"510818009"+"@cluster0.kfy9c.mongodb.net/"+"majorProjectDB"+"?retryWrites=true&w=majority"
const conn = mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(port, function() {
                console.log('express server listening on port ' + port);
        }))
        .catch((error) => console.error(error.message));