import axios from 'axios'
import moment from 'moment'

import { useState } from 'react'
import { axiosInstance } from '../apiSetup';
import { conferenceFetched,conferenceUpdated, setLoading, hallColorsFetched,conferenceDeleted, conferenceCreated  } from '../reducers/conferenceReducer';

const useConfService= ()=>{

    const [error, setError] = useState(false);

    const getAllConfs =()=>{
        
        return async dispatch =>{
            try {
                console.log('alllccccc')
                dispatch(setLoading(true))
                const res = await axiosInstance.get('http://localhost:8000/user/allconf')

                if(res.status!==200){console.log(res);throw new Error(res)}
                // var s = transformConf(res.data)
                dispatch(conferenceFetched(res.data))
                dispatch(setLoading(false))
            } catch (e) {
                console.log(e)
                dispatch(setLoading(false))
            }
        }
    }

    const fetchHallColors =()=>{
        
        return async dispatch =>{
            try {

                dispatch(setLoading(true))
                const res = await axiosInstance.get('http://localhost:8000/system/hall-colors')

                if(res.status!==200){console.log(res);throw new Error(res)}

                dispatch(hallColorsFetched(res.data))

            } catch (e) {
                console.log(e)
                dispatch(setLoading(false))
            }
        }
    }
    const deleteConf =(id)=>{
        
        return async dispatch =>{
            try {
                dispatch(setLoading(true))
                const res = await axiosInstance.delete(`http://localhost:8000/user/conference/${id}`)

                if(res.status!==200){console.log(res);throw new Error(res)}

                dispatch(conferenceDeleted(res.data.conferences))

            } catch (e) {
                console.log(e)
                dispatch(setLoading(false))
            }
        }
    }
    const createConf =(conf)=>{
        
        return async dispatch =>{
            const {dataEnd,userId,hallId,dataBeg, type} = conf;
            try {
                dispatch(setLoading(true))
                const res = await axiosInstance.post(`http://localhost:8000/user/addConf`,
                {   
                    dataEnd,
                    userId,
                    hallId,
                    dataBeg,
                    type
                })

                if(res.status!==200){console.log(res);throw new Error(res)}

                dispatch(conferenceCreated(res.data.newConf))
                alert(res.data.message)

            } catch (e) {
                console.log(e)
                dispatch(setLoading(false))
                alert(error.response.data.message)
            }
        }
    }

    async function addConf(conf){
        const {dataEnd,userId,hallId,dataBeg, type} = conf;
        try {
            setLoading(true)
             await axios.post('http://localhost:8000/user/addConf',
                    {   dataEnd,
                        userId,
                        hallId,
                        dataBeg,
                        type
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
    
  

    const updateConf =(conf)=>{
    
        return async dispatch =>{
            try {
                const {id, dataEnd,userId,hallId,dataBeg} = conf;
                dispatch(setLoading(true))
                const response = await axiosInstance.put(`http://localhost:8000/user/update-conference/${id}`, 
                {   
                    dataEnd,
                    userId,
                    hallId,
                    dataBeg
                })
                dispatch(conferenceUpdated(response.data.conference))
                dispatch(setLoading(false))
                return true
            } catch (e) {
                alert(e.response.data.message)
                dispatch(setLoading(false))
                return false
            }
        }
    }


    return{ error, addConf,  getAllConfs, fetchHallColors, updateConf, deleteConf, createConf}
}

export default useConfService