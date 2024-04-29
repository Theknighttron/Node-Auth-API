/**
 * All configuration parameters.
 */


module.exports = {
    HOST: "localhost",
    USER: "admin",
    PASSWORD: "db@2024",
    DB: "authentication",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
