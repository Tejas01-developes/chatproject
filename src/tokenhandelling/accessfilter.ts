import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface customreq extends FastifyRequest{
    userId?:string
}

export const accessfilter=(req:customreq,resp:FastifyReply,next:HookHandlerDoneFunction)=>{
    const token=req.headers.authorization
    const access=token?.split(" ")?.[1]

    if(!access){
       return resp.status(400).send({success:false,message:"access token is not there"})
    }
try{
const decode=jwt.verify(access,process.env.ACCESS_KEY as string) as JwtPayload

req.userId=decode.id
console.log(req.userId)
next()

}catch(err){
    console.log(err)
    return resp.status(400).send({success:false,message:"access filter failed"})
}

}