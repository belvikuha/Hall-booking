import axios from 'axios'

import { useCallback } from 'react';


// const {login} = useUserService()

import {setUser} from "../reducers/userReducer.js";



export const login =(login, password)=>{
    
    return async dispatch =>{
        try {
            const response = await axios.post('http://localhost:8000/admin/login', {
                login,
                password
            })
            console.log('in login')
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

// export const auth =()=>{
//     console.log("auth");
//     return async dispatch =>{
//         try {
//             const response = await axios.get('http://localhost:8000/admin/auth',
//               {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
//             dispatch(setUser(response.data.user))
//             localStorage.setItem('token', response.data.token)
//         } catch (e) {
//             // alert(e.response.data.message);
//             localStorage.removeItem('token')
//         }
//     }
// }
export const UserActions =()=>{
    const auth =useCallback(()=>{
    console.log("auth");
    return async dispatch =>{
        try {
            const response = await axios.get('http://localhost:8000/system/auth',
              {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            // alert(e.response.data.message);
            localStorage.removeItem('token')
        }
    }
    },[])
    return{auth}
}

