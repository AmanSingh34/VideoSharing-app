import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv"
import userRoutes from './routes/user.routes.js'
import videoRoutes from './routes/video.routes.js'
import commentRoutes from './routes/comment.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config()

const app = express()
const connect = ()=>{
    mongoose.connect(process.env.MONGO_CONNECT)
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        throw err;
    })
}
app.use(cors({
    origin:[""],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

app.use((err,res,req,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went Wrong !";
    return res.status(status).json({
        success:false,
        status,
        message
    })
})

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)

app.listen(process.env.PORT,()=>{
    connect()
    console.log("Connected at 8800");
})
