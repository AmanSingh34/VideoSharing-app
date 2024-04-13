import { createError } from '../error.js';
import Video from '../models/video.model.js'
import User from '../models/user.model.js'


export const addVideo = async (req,res,next)=>{
    const newVideo = new Video({userId:req.user.id,...req.body});
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo)
    } catch (error) {
        next(error)
    }
}

export const updateVideo = async (req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404,"Video not found !"));

        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{new:true})

            res.status(200).json(updatedVideo)
        } else {
            return next(createError(403,"You can update only Your Video !"));
        }
    } catch (error) {
        next(error)
    }
}

export const deleteVideo = async (req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404,"Video not found !"));

        if(req.user.id === video.userId){
           await Video.findByIdAndDelete(req.params.id)

            res.status(200).json("Video Deleted Successfully")
        } else {
            return next(createError(403,"You can delete only Your Video !"));
        }
    } catch (error) {
        next(error)
    }
}

export const getVideo = async (req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}

export const addViews = async (req,res,next)=>{
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        res.status(200).json("The views has been increased !")
    } catch (error) {
        next(error)
    }
}
export const randomVideo = async (req,res,next)=>{
    try {
        const videos = await Video.aggregate([{$sample:{ size:40 }}])
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}
export const trendingVideo = async (req,res,next)=>{
    try {
        const videos = await Video.find().sort({views:-1})
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}
export const subscribedVideo = async (req,res,next)=>{
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subsribedUsers

        const list =await Promise.all(
            subscribedChannels.map((channelId)=>{
                return Video.find({userId:channelId})
            })
        )
        //Here by Using these in built functions we will get videos in only a single array
        //and the newly updated video will appear first
        res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt))
    } catch (error) {
        next(error)
    }
}

export const getBytags = async (req,res,next)=>{
    const tags = req.query.tags.split(",")
    // console.log(tags);
    try {
        const videos = await Video.find({tags:{$in:tags}}).limit(20)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}
export const search = async (req,res,next)=>{
    const query = req.query.q
    // console.log(tags);
    try {
        //the below is important one ans is Reusable to search ...
        const videos = await Video.find({title:{$regex:query, $options:"i"}}).limit(40) 
        res.status(200).json(videos)
        //noice...
    } catch (error) {
        next(error)
    }
}