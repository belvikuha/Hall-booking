import Router from 'express'
import { check } from 'express-validator'

import AdminController from "../Controllers/AdminController.js"
import UserController from '../Controllers/UserController.js'
import ConferenceController from "../Controllers/ConferenceController.js"

import authMiddlewaree from "../middlewaree/authMiddlewaree.js"
import roleMiddleware from "../middlewaree/roleMiddleware.js"

const adminRouter = new Router()

// adminRouter.get('/user', UserController.getAll)
adminRouter.post('/user',[
                        check('login', "Логин не может быть пустым").notEmpty(),
                        check('password', "Пароль не может быть пустым").notEmpty()
                        ],
                        UserController.createUser)
adminRouter.post('/login', UserController.login)
adminRouter.get('/users',roleMiddleware(['ADMIN']), UserController.getAllusers)
adminRouter.delete('/user/:id', UserController.deleteUser)


// adminRouter.get('/auth',authMiddlewaree, UserController.auth)

// adminRouter.get('/passwords',roleMiddleware(['ADMIN']), UserController.getPassw)


export default adminRouter;