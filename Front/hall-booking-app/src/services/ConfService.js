import axios from 'axios'
import moment from 'moment'

const ConfService= ()=>{

//     async function getAllConfs(){
//         try {
//               const response = await axios.get('http://localhost:8000/user/allconf',
//                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
//               return transformConf(response.data)
//            } catch (e) {
//                alert(e.response.data.message)
//            }
//    }
async function getAllConfs(){
    const conferenses= axios.get('http://localhost:8000/user/allconf',
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
         .then(res =>{
            if(res.status!==200){console.log(res);throw new Error(res)}
            const t = res.data
            return transformConf(t)
         })
        .catch(e=>
            alert(e)
        )
    return conferenses
}
    function transformConf(confs){
        
       const newC =  confs.map(c=>{ 
            var s = new Date(transformDate(c.dataBeg))
            var e = new Date(transformDate(c.dataEnd))
            // return {...c, dataBeg:s.toLocaleString(), dataEnd:e
            //     }
           
               return { 
                        'id': c.id,
                        'title': c.hallId,
                       'start': new Date(s.getFullYear(), s.getMonth(), s.getDate(), s.getHours(), s.getMinutes()), // 10.00 AM
                       'end': new Date(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes()),
                       'color': c.hall.color,
                        'userId': c.userId
                    }
        })
        return newC
   }
   const transformDate =(date)=>{
    var init = new Date(date)
    var hour = init.getHours();
    // console.log(hour);
    // console.log(init.getTimezoneOffset()/60)
    // init.setHours(init.getHours() + (init.getTimezoneOffset()/60))
    // return init
    return init
    // .setMinutes((init.getMinutes()) - (init.getTimezoneOffset()))      
   }
  
    // async function addConf(conf){
    //     const {dataEnd,userId,hallId,dataBeg} = conf;
    //     try {
    //         const response = await axios.post('http://localhost:8000/user/addConf',
    //                 // {   dataEnd:toSqlDatetime(new Date(dataEnd)),
    //                 //     userId,
    //                 //     hallId,
    //                 //     dataBeg:toSqlDatetime(new Date(dataBeg)),
    //                 // },
    //                 {   dataEnd,
    //                     userId,
    //                     hallId,
    //                     dataBeg
    //                 },
    //             {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    //         console.log(response) 
    //     } catch (e) {
    //         alert(e)
    //     }
    // }
    async function addConf(conf){
        const {dataEnd,userId,hallId,dataBeg} = conf;
        try {
            const response = await axios.post('http://localhost:8000/user/addConf',
                    {   dataEnd,
                        userId,
                        hallId,
                        dataBeg
                    },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
                .then(res=>{
                    if(res.status!==200){ console.log(res) }
                    console.log("успех")
                },
                error=>alert(error.response.data.message)
                ).catch(e=>console.log(e))
           
        } catch (e) {
            alert(e)
        }
    }
    
    async function getHallColors(){
       
        try {
           var colors =  await axios.get('http://localhost:8000/system/hall-colors')
          var mass = [];
          colors.data.map(c=>{mass.push(c)})
          return mass;
        } catch (error) {
            alert(error);
        }
    }


    return{addConf, transformDate, getAllConfs, getHallColors}
}

export default ConfService