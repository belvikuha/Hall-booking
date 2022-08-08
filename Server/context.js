import mysql from "mysql2"
import Sequelize from "sequelize";

const sequelize = new Sequelize("bookinghall_db", "root", "korova", {
    dialect: "mysql",
    host: "localhost",
    define: {
      timestamps: false
    }
  });
  
  export default sequelize;