const db = require("../models");
const config = require("../config/auth.config.js");
const User = db.user;
const Role = db.role;
const Candidate = db.candidate;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// Create new user in the database
exports.signup = async (req, res) => {
    // Save user to the database
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles,
                    },
                },
            });

            const result = user.setRoles(roles);
            if (result) res.send({ message: "User registered successfully!" });
        } else {
            // user has role = 1
            const result = user.setRoles([1]);
            if (result) res.send({ message: "User registered successfully!" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};


export.signupCandidate = async (req, res) => {
    try {
        cons candidate = await Candidate.create({
            firstname: req.body.firstname,
            lastname: req.body.lasstname,
            gender: req.body.gender,
            student_id: req.body.gender,
            email: req.body.email,
            course: req.body.course,
            level: req.body.level,
        });


        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles,
                    },
                },
            });

        const result = candidate.setRoles(roles);
        if(result) res.send({   message: "Student registered successfully!" });
        } else {
            const result = candidate.setRoles([1]);
            if(result) res.send({   message: "Student registered successfully! "});
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }


exports.signin = async (req, res) => {
    try {
        // find username of the request in the database
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }

        // Compare password with password stored in the database with bcryp
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }


        // Generate new token
        const token = jwt.sign({ id: user.id },
            config.secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });


        let authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        req.session.token = token;


        // return user information & access Token in Cookies
        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};


exports.signout = async (req, res) => {
    // cleanout session
    try {
        req.session = null;

        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
};





