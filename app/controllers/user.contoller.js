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

        // If candidates found send them in the respose
        if (candidates) {
            res.status(200).json({  candidates });
        } else {
            res.status(404).json({  message: "No Students found" });
        }
    } catch (error) {
        res.status(500).send({  message: error.message });
    }
}

exports.getCandidateByStudentId = async (req, res) => {
    const studentId = req.params.student_id;

    console.log(studentId);

    try {
        // Find the candidate with the provided student_id
        const candidate = await Candidate.findOne({
            where: { student_id: studentId }
        });

        // If candidate found send it in response
        if (candidate) {
            res.status(200).json({  candidate });
        } else {
            res.status(404).json({  message: "Student not found" });
        }
    } catch (error) {
        res.status(500).send({  message: error.message });
    }
};
