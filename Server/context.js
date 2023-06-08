import mysql from "mysql2"
import Sequelize from "sequelize";

const sequelize = new Sequelize("bookinghall_db", "root", "k0315roG1111", {
    dialect: "mysql",
    host: "localhost",
    define: {
      timestamps: false
    }
  });
  
  export default sequelize;