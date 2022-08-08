import User from "../Models/User.js"
import bcrypt from 'bcryptjs'
import {validationResult} from 'express-validator'

import jwt from 'jsonwebtoken'
import {secretKey} from '../config.js'

const generateAccessToken =(id, role)=>{
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secretKey, {expiresIn: '1h'})
}

class UserController {
  async createUser(req, res){
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message: "Ошибка регистрации", errors})
        }
        
        const { userName, login, password} = req.body


        
        const candidate = await User.findOne({where: {login: login}});
        if(candidate)
            return res.status(400).json({message: "Пользователь с таким логином уже существует"});
            
        const userRole = "USER";
        const hashPassw = bcrypt.hashSync(password, 5);

        const user = await User.create({
            userName: userName,
            login: login,
            password:hashPassw,
            role:userRole
        })
        await user.save()
        return res.json({message: "Успешно зарегестрирован"})
    }
    catch(e){
        console.log(e);
    }
}

async login(req, res){
    try {
        const {login, password} = req.body
        const user = await User.findOne({where: {login: login}})
        if(!user) 
            return res.status(400).json({message: "Пользователь с таким логином не найден"});
        const validPassword = bcrypt.compareSync(password, user.password) 
        if(!validPassword){
            return res.status(400).json({message: "Неверный пароль"});
        }
        const token = generateAccessToken(user.id, user.role);
        return res.json({token, user})
    } catch (e) {
        console.log(e);
    }
}
async  auth(req, res){
    try {
        console.log("/////////////////////////////"+ req.user.id);
        const user = await User.findOne({where:{id:req.user.id}})
        console.log(user.id)
        const token = jwt.sign({id: user.id}, secretKey, {expiresIn: "1h"})
        return res.json({token, user}) 
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
}

async getAllusers(req, res){
    try {
        const users= await User.findAll()
        res.json(users)
    } catch (error) {
        console.log(e);
    }
   
}

async deleteUser(req, res){
    try {
        const {id}= req.params
        if(!id){
            return res.status(400).json({message: 'Id not match'})
        }
        await User.destroy({ where: {id: id}})
        return res.json({message: 'deleted'});
    } catch (error) {
        return res.status(400).json({message: error})
    }
    
  }

  async getmyconfs(req, res){
    const token = req.headers.authorization.split(' ')[1];
    const{id} = jwt.verify(token, secretKey);
    
    const user = await User.findByPk(id)
        if(!user)   return console.log("Company not found");
    const confs = user.getConferences()
    return res.json(confs);
  } 
  
}

export default new UserController()