import Sequelize from "sequelize";
import sequelize from "../context.js"

import Hall from "./Hall.js";
import User from "./User.js";
import Edits from "./Edits.js";

const Conference =sequelize.define("Conference", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    dataEnd:{
        type: Sequelize.DATE,
        allowNull: true
    },
    dataBeg:{
        type: Sequelize.DATE,
        allowNull: true
    },
    type:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

User.hasMany(Conference)
Conference.belongsTo(User)
Conference.hasMany(Edits)

export default Conference