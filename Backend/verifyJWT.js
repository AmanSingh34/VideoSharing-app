import jwt from "jsonwebtoken";
import {createError} from './error.js'

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token) return next(createError(401,"unAuthorised access"))

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,"Invalid Token"))
        //After the below line we can have the user at everywhere when a user makes a request
        req.user = user;
        next();
    })
}
