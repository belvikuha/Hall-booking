import axios from 'axios'

import { useCallback } from 'react';


// const {login} = useUserService()

import {setUser, setUserLoading as setL, fetchUsers} from "../reducers/userReducer.js";



export const login =(login, password)=>{
    
    return async dispatch =>{
        try {
            dispatch(setL(true))
            const response = await axios.post('http://localhost:8000/admin/login', {
                login,
                password
            })
           
            dispatch(setUser(response.data.user))
            dispatch(setL(false))
            localStorage.setItem('token', response.data.token)
            return true
        } catch (e) {
            alert(e.response.data.message)
            dispatch(setL(false))
            return false
        }
    }
}

export const getUsers =()=>{
    
    return async dispatch =>{
        try {
            // dispatch(setL(true))
            const response = await axios.get('http://localhost:8000/admin/users')
           
            dispatch(fetchUsers(response.data))
            // dispatch(setL(false))
            return true
        } catch (e) {
            alert(e.response.data.message)
            // dispatch(setL(false))
            return false
        }
    }
}

export const UserActions =()=>{
    const auth =useCallback(()=>{
    console.log("auth");
    return async dispatch =>{
        try {
            // dispatch(setL(true));
            const response = await axios.get('http://localhost:8000/system/auth',
              {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data.user))
            // dispatch(setL(false));
            localStorage.setItem('token', response.data.token)
           
        } catch (e) {
            localStorage.removeItem('token')
            // dispatch(setL(false));
        }
    }
    },[])

    return{auth}
}

