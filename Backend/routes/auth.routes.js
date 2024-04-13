import express from 'express'
import { googleAuth, signin, signup } from '../controllers/auth.controller.js'

const router = express.Router()

//Create user
router.post("/signup",signup)

//Sign in
router.post("/signin",signin)
//Google Auth
router.post("/google",googleAuth)

export default router
