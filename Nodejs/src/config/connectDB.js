const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const PORT = 3306;
const sequelize = new Sequelize("bookingcare", "root", null, {
  host: "localhost",
  port: PORT,
  dialect: "mysql",
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
