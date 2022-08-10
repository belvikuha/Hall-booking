import mysql from "mysql2"

import Sequelize from "sequelize";
import sequelize from "../context.js"

import Conference from "./Conference.js";
import Edits from "./Edits.js";

const Hall =sequelize.define("hall", {
    id:{
        type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    color:{
        type: Sequelize.STRING,
        allowNull: true
    }
});
Hall.hasMany(Conference)

Conference.belongsTo(Hall);


export default Hall