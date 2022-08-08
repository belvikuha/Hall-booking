import Router from 'express'

import UserController from "./Controllers/UserController.js"

const router = new Router()

router.get('/user', UserController.getAll)
router.post('/user', UserController.create)
router.get('/user/:id', UserController.getById)
router.get('/user-log', UserController.logIn)
router.delete('/user/:id', UserController.delete)


export default router;