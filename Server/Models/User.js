import Sequelize from "sequelize";
import sequelize from "../context.js"

import Conference from "./Conference.js";
import Edits from "./Edits.js";

const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    login: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password:{
        type: Sequelize.STRING,
      allowNull: true
    },
    role:{
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  // 
  Edits.belongsTo(User)
  User.hasMany(Edits)
  
export default User
