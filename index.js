// Import the necessary packages
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import homeRoutes from './routes/home.js';
import dashboardRoutes from './routes/dashboard.js';

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

// Listen to Port 3000
const port = process.env.PORT || 8080;
app.listen(port, function() {
        console.log('express server listening on port ' + port);
})