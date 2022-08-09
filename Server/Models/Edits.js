import Sequelize from "sequelize";
import sequelize from "../context.js"

import Hall from "./Hall.js";
import User from "./User.js";

const Edits =sequelize.define("Edits", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    date:{
        type: Sequelize.DATE,
        allowNull: true
    },  
});

User.hasMany(Edits)
Edits.belongsTo(User)
Hall.hasMany(Edits)
Edits.belongsTo(Hall)

export default Edits