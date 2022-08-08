import jwt from 'jsonwebtoken'

import {secretKey} from '../config.js'

export default function (req, res, next){
    if(req.method ==="OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({message: "Пользователь не авторизован"});
        } 
        const decodedData = jwt.verify(token, secretKey);
        console.log('good');
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({message: "Пользователь не авторизован error"});
    }

}