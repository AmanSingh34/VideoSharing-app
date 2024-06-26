import { createError } from '../error.js'
import Comment from '../models/comments.model.js'
import Video from '../models/video.model.js'

export const addComment = async (req,res,next)=>{
    //The req.body will have the videoId
    const newComment  = new Comment({...req.body,userId:req.user.id})
    try {
        const savedComment = await newComment.save()
        res.status(200).send(savedComment)
    } catch (error) {
        next(error)
    }
}
export const deleteComment = async (req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id)
        if(req.user.id === comment.userId || req.user.id === video.userId){
            //They can delete this commment
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("Comment has been deleted !")
        } else {
            next(createError(403,"You can only delete your comments"))
        }
        
    } catch (error) {
        next(error)
    }
}
export const getComment = async (req,res,next)=>{
    try {
        const comments = await Comment.find({videoId:req.params.videoId})
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}
export const updateComment = async (req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}