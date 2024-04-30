const express = require('express');
const logger = require('morgan');     //HTTP request logger middleware for node.js
const cookieParser = require('cookie-parser');  //Parse Cookie header and populate req.cookies.
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();
//load config module to get configuration parameters about database.
const db = require("./app/models");
const Role = db.role;


// middleware
app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({ name: "auth-session", secret: "COOKIE_SECRET", httpOnly: true }))


db.sequelize.sync({force: true}).then(() => {
    console.log("Drop and Resync Db");
    initial();
})

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "admin"
    });
}

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

//Start listing application on defined port in configuration file.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port $(PORT).`);
});
