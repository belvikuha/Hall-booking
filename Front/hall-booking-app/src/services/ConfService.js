import axios from 'axios'
import moment from 'moment'

import { useState } from 'react'


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
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);


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
            setLoading(true)
             await axios.post('http://localhost:8000/user/addConf',
                    {   dataEnd,
                        userId,
                        hallId,
                        dataBeg
                    },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
                .then(res=>{
                    // console.log(res)
                    if(res.status!==200){ throw new Error(res.data.message); }
                    console.log("успех")
                   

                },
                error=>{alert(error.response.data.message)
                setLoading(false)
                setError(true)
                }
                ).catch(e=>{alert(e.message); 
                    setLoading(false)
                    setError(true)})

           
        } catch (e) {
            alert(e)
        }
    }
    
    async function getHallColors(){
       setLoading(true);
        try {
           var colors =  await axios.get('http://localhost:8000/system/hall-colors')
          var mass = [];
          colors.data.map(c=>{mass.push(c)})
          setLoading(false)
          return mass;
        } catch (error) {
            alert(error);
            setError(true)
        }
    }
    // update-conference/:confid
    async function updateConf(conf){
        setLoading(true)
        try {
            const {id, dataEnd,userId,hallId,dataBeg} = conf;
            await axios.put(`http://localhost:8000/user/update-conference/${id}`, 
            {   
                dataEnd,
                userId,
                hallId,
                dataBeg
            },
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            .then(res=>{
                 if(res.status!==200){ throw new Error(res.data.message)}
                // console.log("успех")
                setLoading(false)
            },
            error=>{alert(error.response.data.message);setLoading(false);setError(true)}
            ).catch(e=>{alert(e.message);setLoading(false);setError(true)})
        } catch (error) {
            alert(error);
            setLoading(false);setError(true)
        }
    }


    return{loading, error, addConf, transformDate, getAllConfs, getHallColors, updateConf}
}

export default ConfService