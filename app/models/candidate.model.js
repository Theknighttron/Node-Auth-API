const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Candidate = sequelize.define("candidate", {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        student_id: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        course: {
            type: Sequelize.STRING
        },
        level: {
            type: Sequelize.STRING
        },

    });

    return Candidate;
}
