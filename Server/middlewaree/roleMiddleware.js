import jwt from 'jsonwebtoken'

import {secretKey} from '../config.js'

export default function (roles){
    return function(req, res, next){
        if(req.method ==="OPTIONS"){
            next()
        }
        try {
            var token = req.headers.authorization
            if(token){
                token = token.split(' ')[1];
                const{role} = jwt.verify(token, secretKey)
                let hasRole = false;
        
                    if(roles.includes(role)){
                        hasRole = true
                    }
             
                if(!hasRole){
                    return res.status(403).json({message: "У вас нет доступа"});
                }
                next()
            }
            else{
                console.log(' не авториз ')
                return res.status(403).json({message: "Пользователь не авторизован"});
            }
            
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован error"});
        }
    }
}