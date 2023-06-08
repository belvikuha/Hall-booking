import jwt from 'jsonwebtoken'

import {secretKey} from '../config.js'

export default function (roles){
    return function(req, res, next){
        if(req.method ==="OPTIONS"){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            const {userId} = req.params;

            const{role, id} = jwt.verify(token, secretKey)
            
            let hasRole = false;
        
            if(role === "USER" && userId != id){
                
            }
                    if(roles.includes(role)){
                        hasRole = true
                    }
             
                if(!hasRole){
                    return res.status(403).json({message: "У вас нет доступа"});
                }
                next()
            }
           
            
         catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован error"});
        }
    }
}