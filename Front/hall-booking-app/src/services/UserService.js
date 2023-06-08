import axios from 'axios'
import moment from 'moment'

import { useState } from 'react'
import { getToken } from '../selectors/userSelectors'
import { useSelector } from 'react-redux'

import { axiosInstance } from '../apiSetup'

const UserService= ()=>{


    async function getAllUsers(){
        const users= axiosInstance.get('http://localhost:8000/admin/users')
            .then(res =>{
                if(res.status!==200){console.log(res);throw new Error(res)}
                return res.data
            })
            .catch(e=>
                alert(e)
            )
        return users
    }
    

    return{getAllUsers}
}

export default UserService