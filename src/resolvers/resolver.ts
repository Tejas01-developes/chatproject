

const sublisten="subscribe"

const resolve={

Mutation:{
    sendmsg:(_parent:any,_args:any,_ctx:any)=>{
        
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