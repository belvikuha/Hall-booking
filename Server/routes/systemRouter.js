import Router from 'express'
import { check } from 'express-validator'

import AdminController from "../Controllers/AdminController.js"
import UserController from '../Controllers/UserController.js'
import ConferenceController from "../Controllers/ConferenceController.js"

import authMiddlewaree from "../middlewaree/authMiddlewaree.js"
import roleMiddleware from "../middlewaree/roleMiddleware.js"

const systemRouter = new Router()


systemRouter.get('/hall-colors', ConferenceController.getHallColors)
systemRouter.get('/auth',authMiddlewaree, UserController.auth)

// adminRouter.get('/passwords',roleMiddleware(['ADMIN']), UserController.getPassw)


export default systemRouter;