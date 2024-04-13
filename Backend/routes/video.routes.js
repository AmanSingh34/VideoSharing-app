import express from 'express'
import { addVideo, addViews, deleteVideo, getBytags, getVideo, randomVideo, search, subscribedVideo, trendingVideo, updateVideo } from '../controllers/video.controller.js'
import {verifyToken} from '../verifyJWT.js'

const router = express.Router()

router.post("/",verifyToken,addVideo)
router.put("/:id",verifyToken,updateVideo)
router.delete("/:id",verifyToken,deleteVideo)
router.get("/find/:id",getVideo)
router.put("/view/:id",addViews)
router.get("/trend",trendingVideo)
router.get("/random",randomVideo)
router.get("/sub",verifyToken,subscribedVideo)
router.get("/tags",getBytags)
router.get("/search",search)

export default router
