import express from "express";
import Sequelize from "sequelize";

import sequelize from "./context.js"
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouter.js";
import systemRouter from "./routes/systemRouter.js";

import Hall from "./Models/Hall.js"
import corsMiddleware from "./middlewaree/corsMiddleware.js"


const PORT = 8000;

var app = express();
app.use(corsMiddleware)
app.use(express.json())
app.use('/admin', adminRouter)
app.use('/user', userRouter)
app.use('/system', systemRouter)

    
////////////////////////////////////////////////////////////////
    sequelize.sync().then(()=>{
        app.listen(PORT, function(){
          console.log("Сервер ожидает подключения...");
        });
      }).catch(err=>console.log(err));

///////////////////////////////////////////////////////////////////


