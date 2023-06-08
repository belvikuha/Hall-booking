import Router from 'express'
import { check } from 'express-validator'

import AdminController from "../Controllers/AdminController.js"
import UserController from '../Controllers/UserController.js'
import ConferenceController from "../Controllers/ConferenceController.js"

import authMiddlewaree from "../middlewaree/authMiddlewaree.js"
import roleMiddleware from "../middlewaree/roleMiddleware.js"

const adminRouter = new Router()


adminRouter.post('/user',[
                        check('login', "Логин не может быть пустым").notEmpty(),
                        check('password', "Пароль не может быть пустым").notEmpty()
                        ],
                        UserController.createUser)
adminRouter.post('/login', UserController.login)
// adminRouter.get('/users',roleMiddleware(['ADMIN']), UserController.getAllusers)
adminRouter.get('/users', UserController.getAllusers)
adminRouter.delete('/user/:id', UserController.deleteUser)


export default adminRouter;