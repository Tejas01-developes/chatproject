import bcrypt from 'bcrypt'
import cookies from '@fastify/cookie'
import { FastifyReply, FastifyRequest } from 'fastify';
import crypto from 'crypto'

import user_collection from '../schemas/userschema.js';
import refresh_collection from '../schemas/refreshschema.js';
import { accesstoken, refreshtoken } from '../tokenhandelling/generatetoken.js';
import { contact_collection } from '../schemas/contactschema.js';

export const registeruser=async(req:FastifyRequest,resp:FastifyReply):Promise<void>=>{
    const{name,email,password}=req.body as {
        name:string,
        email:string,
        password:string
    }

    if(!name || !email || !password){
         resp.status(400).send({succes:false,message:"Fields are missing"})
           return
    }
    try{
    const res=await user_collection.findOne({email})
    if(!res){
        const hash:string=await bcrypt.hash(password,10)
        const userid:string=crypto.randomUUID()
       
        await user_collection.create({id:userid,name,email,password:hash})
        resp.status(200).send({success:true,message:"registration success"})
     return
    }else{
        resp.status(400).send({succes:false,message:"Email is already registered"})
           return 
    }

    }catch(err){
        resp.status(400).send({succes:false,message:"Registration failed"})
        return
    }

}


export const loginuser=async(req:FastifyRequest,resp:FastifyReply)=>{
    const {email,password}=req.body as {
        email:string,
        password:string
    }
    if(!email || !password){
        return resp.status(400).send({success:false,message:"Fields are empty"})
    }
try{
    const res=await user_collection.findOne({email})
    if(!res){
        return resp.status(400).send({success:false,message:"Email is not registered"})
    }
    const compare=await bcrypt.compare(password,res.password)
    if(!compare){
        return resp.status(400).send({success:false,message:"password is incorrect"})
    }
    const id=res.id;
    const access:string=accesstoken(id)
    let refresh:string;

    const refreshres=await refresh_collection.findOne({userid:id})
    if(!refreshres){
        refresh=refreshtoken(id)
        const refreshid=crypto.randomUUID()
        await refresh_collection.create({id:refreshid,userid:id,token:refresh,added_at:Date.now(),expired_at:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})
    }else{
        const now=Date.now()
        const expireddate=refreshres.expired_at
        if(now > expireddate.getTime()){
            refresh=refreshtoken(id)
            await refresh_collection.updateOne({userid:id},{$set:{token:refresh,added_at:Date.now(),expired_at:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}})
        }else{
            refresh=refreshres.token
        }
    }
    resp.cookie("refresh",refresh,{
        httpOnly:true,
        sameSite:"lax",
        secure:true,
        path:"/"
    })
    return resp.status(200).send({success:true,message:"Login success",access})
}catch(err){
    console.log(err)
    return resp.status(400).send({success:false,message:"login failed"})
}
}

interface reqid extends FastifyRequest{
    userId?:string
}

export const adduser=async(req:reqid,resp:FastifyReply)=>{
    const userid=req.userId
    if(!userid){
        return resp.status(400).send({success:false,message:"Authentication error"})
    }
    const{email}=req.body as {
        email:string
    }
    if(!email){
        return resp.status(400).send({success:false,message:"no email recived"})
    }
    const res=await user_collection.findOne({email:email})
    if(!res){
        return resp.status(400).send({success:false,message:"no email recived"})
    }
    const name=res.name
    const id=crypto.randomBytes(3).toString("hex")
    const contact_id=`${name}_${id}`
    await contact_collection.create({user_id:userid,contact_id,email,name})
    return resp.status(200).send({success:true,message:"Contact added",name})
}

export const getcontact=async(req:reqid,resp:FastifyReply)=>{
    const userid=req.userId
    if(!userid){
        return resp.status(400).send({success:false,message:"Authentication error"})
    }
const res:any[]=await contact_collection.find({user_id:userid})
if(res.length === 0 ){
    return resp.status(400).send({success:false,message:"No contact"})
}
return resp.status(200).send({success:true,res})

}