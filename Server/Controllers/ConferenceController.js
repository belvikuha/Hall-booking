import Conferense from "../Models/Conference.js"
import Hall from "../Models/Hall.js";
import Edits from "../Models/Edits.js";
import User from "../Models/User.js";
import {Op} from "sequelize";
import { LectureConferenceFactory } from "../Factory/LectureConference.js";
import { SessionConferenceFactory } from "../Factory/SessionConference.js";


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


class ConferenceController {
  
    async updateConference(req, res){
      const {dataEnd, userId, hallId, dataBeg} = req.body 
      const {confid}= req.params  
      const conferenceId = Number(confid);

      try{
      var place = await Conferense.findOne({where: {
          [Op.or]:[
            { dataBeg : {[Op.between] : [(dataBeg) , (dataEnd) ]}},
            {dataEnd : {[Op.between] : [(dataBeg) , (dataEnd) ]}}
          ],
          hallId: hallId,
          id:{[Op.ne]: conferenceId} },
        raw: true}
      )

        if(place){
          throw new Error( "На это время зал занят")
        }
        else {
          await Conferense.update({ dataEnd, hallId, dataBeg }, { where: { id: conferenceId }, raw: true });
        
          await Edits.create({
            date: new Date(),
            ConferenceId: conferenceId,
            userId: userId
          }, { raw: true });
        
          const newConf = await Conferense.findOne({
            where: { id: conferenceId },
            attributes: ['id', 'dataBeg', 'dataEnd'],
            include: [
              {
                model: Hall,
                required: true
              },
              {
                model: User,
                attributes: ['id', 'userName'],
                required: true,
                right: true
              }
            ]
          });
        
          res.json({ conference: newConf, message: "Успіх" });
        }
        }
        catch(e){
          res.status(400).json({ message: e.message });
          console.log(e.message);
        
        }
    }

    
    async addConference(req, res){
      const {dataEnd, userId, hallId, dataBeg, type} = req.body 

      try{
        var place = await Conferense
        .findOne({where: {[Op.or]:[
          { dataBeg : {[Op.between] : [(dataBeg) , (dataEnd) ]}},
          {dataEnd : {[Op.between] : [(dataBeg) , (dataEnd) ]}}
          ],
          hallId: hallId },
          raw: true})
        if(place){
          throw new Error( "На это время зал занят")
        }
        else {
            var factory = operateType(req.body)
            var conference = factory.factoryMethod(dataEnd, userId, hallId, dataBeg)
            var newConf = await Conferense.create(conference)
            const newConfObj = await Conferense.findOne({
              where: { id: newConf.id },
              attributes: ['id', 'dataBeg', 'dataEnd'],
              include: [
                {
                  model: Hall,
                  required: true
                },
                {
                  model: User,
                  attributes: ['id', 'userName'],
                  required: true,
                  right: true
                }
              ]
            });
            res.json({newConf:newConfObj, message: conference.message()})
        }   

      }
      catch(e){
        res.status(400).json({message: e.message}); console.log(e.message);
      }
      

    }

    // async addConference(req, res){
    //   const {dataEnd, userId, hallId, dataBeg, type} = req.body 


    //   await Conferense
    //     .findOne({where: {[Op.or]:[
    //       { dataBeg : {[Op.between] : [(dataBeg) , (dataEnd) ]}},
    //       {dataEnd : {[Op.between] : [(dataBeg) , (dataEnd) ]}}
    //       ],
    //       hallId: hallId },
    //       raw: true})
    //     .then( place =>{
    //       console.log(place)
    //       if(place){
    //         throw new Error( "На это время зал занят")
    //       }
    //       else {
    //           var factory = operateType(req.body)
    //           var conference = factory.factoryMethod(dataEnd, userId, hallId, dataBeg)
             
    //           Conferense.create(conference).then(res.json({message: conference.message()}))
    //       } 
    //       }).catch(e=> { res.status(400).json({message: e.message}); console.log(e.message); })

    //   }

      

    async getAllConf(req, res){
     
      const monday = getMonday(new Date()).toISOString().replace(/[T]/g,' ');
      const d = monday.substring(0, monday.length - 5)
        try {
            const confs= await Conferense.findAll({
              // where: {dataBeg:{ [Op.gt]:d}}, //Op.gt/lt
              // limit: 7,
              attributes:['id', 'dataBeg', 'dataEnd'],
              include: [
                {
                  model: Hall,
                  required: true
                },
                {
                  model: User,
                  attributes:['id', 'userName'],
                  required: true,
                  right: true
                }
            ]
            }
            
            );
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
         await Hall.findAll({attributes: ['color', 'id']})
         .then(result => {
          res.json(result)
        })  
      } catch (error) {
        return res.status(400).json({message: 'ups!'});
      }
    }

    async deleteConference(req, res){
      try {
          const {id}= req.params
          if(!id){
              return res.status(400).json({message: 'Id not match'})
          }
          await Conferense.destroy({ where: {id: id}})
          var confs = await Conferense.findAll({
            attributes:['id', 'dataBeg', 'dataEnd'],
            include: [
              {
                model: Hall,
                required: true
              },
              {
                model: User,
                attributes:['id', 'userName'],
                required: true,
                right: true
              }
          ]
          });
          return res.json({conferences: confs, message: 'deleted'});
      } catch (error) {
          return res.status(400).json({message: error})
      }
      
    }
    async demo(req, res){   
        const startedDate = new Date("2022-05-10 00:00:00");
        const endDate = new Date("2022-07-10 00:00:00");
        const candidate = await Conferense.findAll({where: {dataBeg : {[Op.between] : [startedDate , endDate ]}}});
        return res.json(candidate);
    }  
  
}


const operateType = (conference)=>{
  console.log(conference)
      switch (conference.type){
        case "LECTURE":
          return new LectureConferenceFactory({...conference})
        case "SSESION":
          return new SessionConferenceFactory({...conference})
      }
}

export default new ConferenceController()