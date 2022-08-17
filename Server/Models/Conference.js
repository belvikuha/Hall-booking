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
    // userId:{
    //     type: Sequelize.INTEGER,
    //     allowNull: true
    // },
    // hallId:{
    //     type: Sequelize.INTEGER,
    //     allowNull: true
    // },
    dataBeg:{
        type: Sequelize.DATE,
        allowNull: true
    }
});

User.hasMany(Conference)

Conference.belongsTo(User)

// Edits.belongsTo(Conference)
Conference.hasMany(Edits)

export default Conference