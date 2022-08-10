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






export default Edits