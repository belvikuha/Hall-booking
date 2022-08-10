import Router from 'express'

import UserController from "../Controllers/UserController.js"
import ConferenceController from '../Controllers/ConferenceController.js'

import { check } from 'express-validator'
import authMiddlewaree from "../middlewaree/authMiddlewaree.js"

const userRouter = new Router()


userRouter.post('/addConf', ConferenceController.addConference)
// userRouter.get('/conferences', ConferenceController.allConferences)
userRouter.put('/update-conference/:confid',authMiddlewaree, ConferenceController.updateConference)

userRouter.get('/myconf',authMiddlewaree, UserController.getmyconfs)

userRouter.get('/allconf', ConferenceController.getAllConf)


userRouter.get('/demo', ConferenceController.demo)

export default userRouter;