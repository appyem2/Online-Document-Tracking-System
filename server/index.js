// Import the necessary packages
import express from 'express';
import bodyParser from 'body-parser';
import homeRoutes from './routes/home.js';
import dashboardRoutes from './routes/dashboard.js';

// Initialize and set the express app
const app = express();
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