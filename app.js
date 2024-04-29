const express = require('express');
const logger = require('morgan');     //HTTP request logger middleware for node.js
const cookieParser = require('cookie-parser');  //Parse Cookie header and populate req.cookies.
const bodyParser = require('body-parser');
const validate = require('express-validation');

const app = express();
//load config module to get configuration parameters about database.
const config = require('./app/config');
//Get route index so request can be redirect according to route.
const routes = require('./app/routes');


// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


//Log all the incoming request body part so what is received can be check in console.
app.use(function (req, res, next) {
    console.log(req.body);
    next();
});


//Call route's index /app/routes.js
app.use('/', routes);

//error handler, if request parameters do not fullfil validations a error message would be sent back as response.
app.use(function (err, req, res, next) {
    // specific for validation errors
    if (err instanceof validate.ValidationError) {

        return res.json({status: err.status, errorMessage: err});

    }
});


//Start listing application on defined port in configuration file.
app.listen(config.app_port);
console.log('Express server listening on port ' + config.app_port);

