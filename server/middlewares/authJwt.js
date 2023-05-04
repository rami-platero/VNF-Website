import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";
dotenv.config();
import User from '../models/User.js';
import Role from '../models/Role.js';

export const verifyToken = async (req,res,next)=>{

    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(" ")[1]

    const {_id} = jwt.verify(token, process.env.SECRET)
    req.userid = await User.findOne({_id}).select('_id')
    if(!req.userid){
        return res.status(404).json({message: "No user found"})
    }
    next()
}

export const isAdmin = async (req,res,next) => {
    const user = await User.findById(req.userid)
    const roles = await Role.find({_id: {$in: user.roles}})

    for (let i =0;i<roles.length;i++){
        if(roles[i]?.name === 'admin'){
            next()
            return;
        }
    }
    return res.status(403).json({message: "Requires admin role"}) 
}
