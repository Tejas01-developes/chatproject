import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface customreq extends FastifyRequest{
    userId?:string
}

export const queryaccessfilter=(req:customreq,resp:FastifyReply)=>{
    const token=req.headers.authorization
    const access=token?.split(" ")?.[1]

    if(!access){
       return {
        userId:null
       }
    }
try{
  
const decode=jwt.verify(access,process.env.ACCESS_KEY as string) as JwtPayload

return{
    userId:decode.id
}


}catch(err){
    console.log(err)
    return{
        userId:null
    }
}

}