const db = require("../models");
const User = db.user;
const Candidate = db.candidate;
const Attendance = db.attendance;
const { parse } = require('json2csv');
const fs = require('fs');


// for public access
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

// for loggedin user (user/admin) role
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};


exports.getUserProfile = async (req, res) => {
    try {
        // Retrieve teacher profile information
        const user = await User.findByPk(req.userId, {
            attributes: { exclude: ["password"] } // Exclude password field from the response
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Send the profile information in the response
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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



exports.updateStudent = async (req, res) => {
    const studentId = req.params.student_id;

    try {
        // Find student by student id
        const student = await Candidate.findByPk(studentId);

        // If student not found reture 404
        if(!student) {
            return res.status(400).json({ message: "Student not found" });
        }

        // Update student details with data from request body
        student.firstname = req.body.firstname;
        student.lastname = req.body.lastname;
        student.gender = req.body.gender;
        student.email = req.body.email;
        student.course = req.body.course;
        student.level = req.body.level;

        // Save the updated student record
        await student.save();

        // Send a success response
        res.status(200).json({ message: "Student details updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



exports.deleteStudent = async (req, res) => {
    const studentId = req.params.student_id;

    try {
        // Find student by student id
        const student = await Candidate.findByPk(studentId);

        // If student not found return 404
        if(!student) {
            return res.status(400).json({ message: "Student not found" });
        }

        // Delete the student record
        await student.destroy();

        // Send a success response
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getAttendanceByDate = async (req, res) => {
    const date = req.params.date;

    try {
        // Retrieve attendance records for the specified date
        const attendanceRecords = await Attendance.findAll({
            where: { date }
        });

        // Send the retrieved attendance records in the response
        res.status(200).json(attendanceRecords);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};



exports.exportAttendanceData = async (req, res) => {
    const date = req.params.date;

    try {
        // Retrieve attendance data for the specified date
        const attendanceData = await Attendance.findAll({
            where: { date }
        });

        // Define fields for export (e.g., student_id, status, date)
        const fields = ['student_id', 'status', 'date'];

        // Convert attendance data to CSV format
        const csv = parse(attendanceData, { fields });

        // Set headers for the response to trigger download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=attendance_${date}.csv`);

        // Send the formatted data as a downloadable file
        res.status(200).send(csv);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};
