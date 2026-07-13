"use client"

import { Button } from '@/lib/buttons/button'
import { Contactside } from '@/lib/chatpagedivs/chatdiv1'
import { Chatbox } from '@/lib/chatpagedivs/chatdiv2'
import { addmessage, subscribe } from '@/lib/resolver/resolvers'
import { Authcontext, useAuth } from '@/lib/token'
import { useMutation, useSubscription } from '@apollo/client/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface contacttype{
    name:string
    contact_id:string
}


const page = () => {
const[contact,setcontact]=useState<contacttype[]>([])
const[contactid,setcontactid]=useState()
const{getaccess}=useAuth()
const token=getaccess()
const router=useRouter()
const[msg,setmsg]=useState()
const{register,handleSubmit,formState:{errors}}=useForm()
const[sendmsg,{data,loading,error}]=useMutation(addmessage)


useEffect(()=>{
const getcontacts=async()=>{
    try{
        console.log(getaccess())
    const res=await axios.get("http://localhost:4000/apis/get",{headers:{Authorization:`Bearer ${token}`}})
    if(res.data.success){
        setcontact(res.data.res)
    }
}catch(err){
    alert("user fetch failed")
}
}
getcontacts()
},[])


const navigate=()=>{
    router.replace("/addcontact")
}

const sendmessage=async(data:any)=>{
if(!contactid){
return alert("select frient to send message")
}
try{
const resp=await sendmsg({
    variables:{
        message:data.message,
        toid:contactid
    }
})
if(resp.data?.sendmsg?.success){
    console.log("message sent succesfully")
}else{
    return alert("message failed to send")
}
}catch(err){
return alert(err)
}
}


useSubscription(subscribe,{
    onData:({data})=>{
        const livemessage=data?.data?.sendmessage
        setmsg(livemessage)
    }
})





  return (
    <div className='flex'>
      <Contactside>
{contact.map((i,key)=>(
    <div key={key} onClick={()=>setcontactid(i.contact_id)}>
<h3>{i.name}</h3>

    </div>
))}


      </Contactside>


      <Chatbox>
        <form onSubmit={handleSubmit(sendmessage)} >

<input type="text" placeholder='Write message here' {...register("message",{required:"Write the message to send"})} />
{errors.email && (
    <p>{String(errors.email.message)}</p>
)}
<Button type='submit'>{loading ? <h3>Loading.....</h3>: "send"}</Button>
<h1>{msg}</h1>
    
<Button type='button' onClick={navigate}>Add contact</Button>
</form>
      </Chatbox>
   

    </div>
  )
}

export default page
