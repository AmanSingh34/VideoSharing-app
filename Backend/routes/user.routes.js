import express from 'express'
import { Delete, dislike, getUser, like, subscribe, unsubscribe, update } from '../controllers/user.controller.js'
import { verifyToken } from '../verifyJWT.js'

const router = express.Router()
//update user
router.put("/:id",verifyToken,update)
//delete user 
router.delete("/:id",verifyToken,Delete)
//get a user 
router.get("/find/:id",getUser)
//subscribe user
router.put("/sub/:id",verifyToken,subscribe)
//unsubscribe a user
router.put("/unsub/:id",verifyToken,unsubscribe)
//like a video
router.put("/like/:videoId",verifyToken,like)
//dislike a video
router.put("/dislike/:videoId",verifyToken,dislike)

export default router