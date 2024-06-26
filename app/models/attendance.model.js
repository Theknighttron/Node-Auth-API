const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Attendance = sequelize.define("attendance", {
        student_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        status: {
            type: Sequelize.ENUM("present", "absent"),
            allowNull: false,
        },
    });

 // Define the association with the Student model
    Attendance.belongsTo(sequelize.models.student, { foreignKey: 'student_id', onDelete: 'CASCADE' });

    return Attendance;
};
