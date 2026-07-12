import mongoose from "mongoose";

const messageschema=new mongoose.Schema({
    message_id:{
        type:String,
        unique:true,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    send_at:{
        type:Date,
        default:Date.now()
    }

})

export const message_collection=mongoose.model("messages",messageschema)