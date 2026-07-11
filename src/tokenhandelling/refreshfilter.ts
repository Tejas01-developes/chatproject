import jwt, { JwtPayload } from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from 'fastify';
import cookies from '@fastify/cookie'
import { accesstoken } from './generatetoken';
import dotenv from 'dotenv';
dotenv.config();



// interface customreq extends Request{
//     id?:string
// }
export const refreshfilter=(req:FastifyRequest,resp:FastifyReply)=>{
    const token=req.cookies.refresh
   

    if(!token){
       return resp.status(400).send({success:false,message:"refresh token is not there"})
    }
try{
const decode=jwt.verify(token,process.env.REFRESH_KEY as string) as JwtPayload
const id=decode.id
if(!id){
    return resp.status(400).send({success:false,message:"userid is not decoded"})
}
const access=accesstoken(id)
return resp.status(200).send({success:true,access,id})
}catch(err){
    return resp.status(400).send({success:false,message:"refresh filter failed"})
}

}