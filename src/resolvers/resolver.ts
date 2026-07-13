import { message_collection } from "../schemas/messageschema"


const sublisten="subscribe"
interface msgtype{
    message:string,
    toid:string
}


export const resolve={

Mutation:{
    sendmsg:async(_parent:any,args:msgtype,_ctx:any)=>{
        const user=_ctx.userId
        // console.log("userid",user)
        if(!user){
            return{
                success:false, 
                message:"no Auth"
            }
        }
        const{message}=args
        if(!message){
            return{
                success:false,
                message:"no message recived to server"
            }

        }
        const message_id=crypto.randomUUID()
        await message_collection.create({message_id,from:user,to:args.toid,message})

        const livemsg={
            message:message
        }
        _ctx.pubsub.publish({
            topic:sublisten,
            payload:{
               sendmessage:livemsg
            }
        })
        return{
            success:true,
            message:"message send"
        }
        
    }
},



Query:{
    getmessage:async(_parent:any,_args:any,_ctx:any)=>{
    const{toid}=_args
        const user=_ctx.userId
        if(!user){
            return{
                success:false, 
                message:"no Auth"
            }
        }
        try{
            const res:any[]=await message_collection.find({from:user,to:toid})
            if(res.length === 0){
                return{
                    success:false, 
                    message:"no message with your contact"
                }
            }
            return res
        }catch(err){
            console.log("query error",err)
        }
    }
},



Subscription:{
    sendmessage:{
        subscribe:(_parent:any,_args:any,ctx:any)=>{
            return ctx.pubsub.subscribe(sublisten)
        }
    }
}


}