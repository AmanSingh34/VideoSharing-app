import { createError } from "../error.js"
import User from '../models/user.model.js'
import Video from '../models/video.model.js'

export const update = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{
                new:true
            })
            
            res.status(200).json(updateUser)
        } catch (error) {
            next(err)
        }
    } else {
        return next(createError(403,"You can update only your account"))
    }
}
export const Delete = async(req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
           await User.findOneAndDelete(req.params.id)
            res.status(200).json("User Deleted Successfully")
        } catch (error) {
            next(err)
        }
    } else {
        return next(createError(403,"You can delete only your account"))
    }

}
export const getUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user) return next(createError(404,"User doesn't exist"))
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
export const subscribe = async (req,res,next)=>{
    try {

       await User.findByIdAndUpdate(req.user.id,{
            $push:{subsribedUsers:req.params.id}
       })

       await User.findByIdAndUpdate(req.params.id,{
        $inc:{ subscribers:1 }
       })
       res.status(200).json("Subsbscribed Sucessfully")
    } catch (error) {
        next(error)
    }

}
export const unsubscribe = async (req,res,next)=>{
    try {

        await User.findByIdAndUpdate(req.user.id,{
             $pull:{subsribedUsers:req.params.id}
        })
 
        await User.findByIdAndUpdate(req.params.id,{
         $inc:{ subscribers: -1 }
        })
        res.status(200).json("unSubscribed Sucessfully")
     } catch (error) {
         next(error)
     }
}
export const like = async(req,res,next)=>{
    const id = req.user.id
    const videoId = req.params.videoId
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })

        res.status(200).json("Video has been liked")
    } catch (error) {
        next(error)
    }
}
export const dislike = async (req,res,next)=>{
    const id = req.user.id
    const videoId = req.params.videoId
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })

        res.status(200).json("Video has been disliked")
        
    } catch (error) {
        next(error)
    }   
}

export const countViews = async(req,res)=>{
    
}