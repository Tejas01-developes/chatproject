import mongoose from "mongoose";

const contactschema=new mongoose.Schema({

user_id:{
    type:String,
    required:true 
},



contact_id:{
type:String,
unique:true,
required:true
},

name:{
    type:String,
    required:true
},
email:{
    type:String,
    unique:true,
    required:true 
},
added_at:{
    type:Date,
    default:Date.now()
}


})

export const contact_collection=mongoose.model("contacts",contactschema)