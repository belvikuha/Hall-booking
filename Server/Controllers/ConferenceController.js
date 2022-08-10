import Conferense from "../Models/Conference.js"
import Hall from "../Models/Hall.js";
import Edits from "../Models/Edits.js";
import {validationResult} from 'express-validator'
import {Op} from "sequelize";


import jwt from 'jsonwebtoken'
import {secretKey} from '../config.js'

// function tosqld2(inputDate){
//   const d = new Date(inputDate)
//   return new Date(
//     d.getFullYear(),
//     d.getMonth(),
//     d.getDate(),
//     d.getHours(),
//     d.getMinutes(), 
//   ).toISOString().slice(0, 19).replace('T', ' ')
// }

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

const transformDate =(date)=>{
  var init = new Date(date)
  var hour = init.getHours();
  // console.log(hour);
  // console.log(init.getTimezoneOffset()/60)
  // init.setHours(init.getHours() + (init.getTimezoneOffset()/60))
  // return init
  return init
  .setMinutes((init.getMinutes()) + (init.getTimezoneOffset()))      
 }
class ConferenceController {
  
    // async updateConference(req, res){
    //   try{
    //   const {confid}= req.params
    //   const {dataEnd,hallId, dataBeg} = req.body

    //   const token = req.headers.authorization.split(' ')[1];
    //   const{role, id:usid} = jwt.verify(token, secretKey)

    //  await Conferense.findOne({where: {id: confid}, raw: true})
    //  .then(conf =>{
    //     if(conf.userId !=usid && role==="USER"){
    //       throw new Error('baz', 'невозможно изменить запись другого пользователя!');
    //     }
    //     return Conferense.findOne({where: {dataBeg : {[Op.between] : [dataBeg , dataEnd ]}, 
    //       hallId:hallId }, raw: true});
    //  })
    //  .then(candidate =>{
    //     if(candidate){
    //       return false
    //     }
    //     return Conferense.update({dataEnd, hallId, dataBeg},{where: {id:confid}, raw: true})
    //   })
    //   .then(resp=>{
    //     if(resp){return res.json({message: 'updated succesfuly'});}
    //     return res.status(400).json({message: "На это время зал занят"});
    //   })
    //   .catch(e=>{
    //     res.status(400).json({message: e.message})
    //   }
    //   );
    //   }catch(e){}
    // }

    async updateConference(req, res){
      const {dataEnd, userId, hallId, dataBeg} = req.body 
      const {confid}= req.params  
         await Conferense
            .findOne({where: {
                [Op.or]:[
                  { dataBeg : {[Op.between] : [(dataBeg) , (dataEnd) ]}},
                  {dataEnd : {[Op.between] : [(dataBeg) , (dataEnd) ]}}
                ],
                hallId: hallId },
              raw: true}
            )
            .then( place =>{
              console.log(place)
              if(place){
                throw new Error( "На это время зал занят")
              }
              else {
                  Conferense.update({dataEnd,
                  hallId,
                  dataBeg},{where: {id:confid}, raw: true})
                  .then(
                    Edits.create({
                      date:new Date(),
                      userId: userId,
                      ConferenseId: confid
                      })
                  ).then(res.json({message: "Успіх"}))
              } 
              }).catch(e=> { res.status(400).json({message: e.message}); console.log(e.message); })
    }
    

    async addConference(req, res){
        // try{
            // const errors = validationResult(req)
            // if(!errors.isEmpty()){
            //     return res.status(400).json({message: "Ошибка заполнения формы", errors})
            // } 
          const {dataEnd, userId, hallId, dataBeg} = req.body 
          console.log(dataBeg);  
          console.log(dataEnd);  
         await Conferense
            .findOne({where: {[Op.or]:[
              { dataBeg : {[Op.between] : [(dataBeg) , (dataEnd) ]}},
              {dataEnd : {[Op.between] : [(dataBeg) , (dataEnd) ]}}
              ],
              hallId: hallId },
              raw: true})
            .then( place =>{
              console.log(place)
              if(place){
                // res.status(400).json({message: "На это время зал занят"})
                // // res.status(401)
                // return 
                throw new Error( "На это время зал занят")
              }
              else {
                  Conferense.create({dataEnd,
                  userId,
                  hallId,
                  dataBeg}).then(res.json({message: "Успіх"}))
              } 
              }).catch(e=> { res.status(400).json({message: e.message}); console.log(e.message); })
            
     
        // }
        // catch(e){
        //     console.log(e);
        // }
        
      }

      

    async getAllConf(req, res){
     
      const monday = getMonday(new Date()).toISOString().replace(/[T]/g,' ');
      const d = monday.substring(0, monday.length - 5)
        try {
            const confs= await Conferense.findAll({
              // where: {dataBeg:{ [Op.gt]:d}}, //Op.gt/lt
              // limit: 7,
              include: {
                model: Hall,
                required: true
              }
            });
            return res.json(confs)
        } catch (error) {
          console.log(error)
            return res.status(400).json({message: "o no"});
        }
       
    }
    async getConfById(req, res){
        const {id}= req.params
        
        if(!id){
          res.status(400).json({message: 'Id not match'})
        }
        const conf = await Conferense.findOne({where: {id: id}})
        
        if(!conf) return  res.status(400).json({message: 'not found'});
        
        return res.json(conf);
        
    }

    async getHallColors(req, res){
      try {
         await Hall.findAll({attributes: ['color']})
         .then(result => {
          var mass =[];
          result.map((r)=> {mass.push(r.color) })
          res.json(mass)
        })

        
        // return res.send(colors)
      } catch (error) {
        return res.status(400).json({message: 'ups!'});
      }
    }

  



    async delete(req, res){
      try {
          const {id}= req.params
          if(!id){
              return res.status(400).json({message: 'Id not match'})
          }
          await Conferense.destroy({ where: {id: id}})
          return res.json({message: 'deleted'});
      } catch (error) {
          return res.status(400).json({message: error})
      }
      
    }
    async demo(req, res){   
        const startedDate = new Date("2022-05-10 00:00:00");
        const endDate = new Date("2022-07-10 00:00:00");

        // const candidate = await Conferense.findAll({where: {dataBeg:{ from: {
        //     $between: [startedDate, endDate]
        //     }}}});
        const candidate = await Conferense.findAll({where: {dataBeg : {[Op.between] : [startedDate , endDate ]}}});
        return res.json(candidate);
    }


    
  
}

export default new ConferenceController()