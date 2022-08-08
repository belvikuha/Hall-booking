import express from "express";
import Sequelize from "sequelize";


import sequelize from "./context.js"
// import router from "./router.js";
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouter.js";
import systemRouter from "./routes/systemRouter.js";



import Hall from "./Models/Hall.js"
// import User from "./Models/User.js"

import corsMiddleware from "./middlewaree/corsMiddleware.js"

const PORT = 8000;

var app = express();
app.use(corsMiddleware)
app.use(express.json())
// app.use('/api', router)
app.use('/admin', adminRouter)
app.use('/user', userRouter)
app.use('/system', systemRouter)

// const sequelize = new Sequelize("bookinghall_db", "root", "korova", {
//   dialect: "mysql",
//   host: "localhost",
//   define: {
//     timestamps: false
//   }
// });

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "hallbooking_db",
//     password: "korova"
//   });

////////////////////////////////////////////////////////////////// 
    
////////////////////////////////////////////////////////////////
    sequelize.sync().then(()=>{
        app.listen(PORT, function(){
          console.log("Сервер ожидает подключения...");
        });
      }).catch(err=>console.log(err));

///////////////////////////////////////////////////////////////////


// app.get("/", function(req, res){
//     Hall.findAll({raw:true}).then(halls=>{
//         console.log(halls);
//         return res.json(halls)
//       }).catch(err=>console.log(err));
// });

// async function startApp(){
//     try{
//         await connection.connect(function(err){
//             if (err) {
//               return console.error("Ошибка: " + err.message);
//             }
//             else{
//               console.log("Подключение к серверу MySQL успешно установлено");
//             }
//          });
//         app.listen(PORT, ()=>console.log("Server started"))

//         connection.end(function(err) {
//             if (err) {
//               return console.log("Ошибка: " + err.message);
//             }
//             console.log("Подключение закрыто");
//           });

//     }catch(e){
//         console.log(e);
//     }
// }
// startApp()