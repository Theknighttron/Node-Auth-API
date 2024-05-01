const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.contoller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameorEmail,
            verifySignUp.checkRolesExisted,
        ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);

    app.post("/api/auth/signup/student", controller.signupCandidate);

    app.post(
        "/api/attendance",
        [authJwt.verifyToken],
        controller.markAttendance
    );

    app.post("/api/auth/signout", controller.signout);
};
