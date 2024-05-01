const db = require("../models");
const Candidate = db.candidate;


// for public access
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

// for loggedin user (user/admin) role
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

// for admin role
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

// get list of all student from the database
exports.getCandidates = async (req, res) => {
    try {
        // Fetch all candidates from the database
        const candidates = await Candidate.findAll();

        // If candidate found send them in the respose
        if (candidates) {
            res.status(200).json({  candidates });
        } else {
            res.status(404).json({  message: "No candidates found" });
        }
    } catch (error) {
        res.status(500).send({  message: error.message });
    }
}
