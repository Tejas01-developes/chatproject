"use client"

import { Button } from '@/lib/buttons/button'
import { Contactside } from '@/lib/chatpagedivs/chatdiv1'
import { Chatbox } from '@/lib/chatpagedivs/chatdiv2'
import { Authcontext, useAuth } from '@/lib/token'
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
const{register,handleSubmit,formState:{errors}}=useForm()


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


  return (
    <div className='flex'>
      <Contactside>
{contact.map((i,key)=>(
    <div key={key} onClick={()=>setcontactid(i.contact_id)}>
<h3>{i.name}</h3>
<h1>{contactid}</h1>
    </div>
))}


      </Contactside>


      <Chatbox>
        <form >

<input type="text" placeholder='Write message here' {...register("message",{required:"Write the message to send"})} />
{errors.email && (
    <p>{String(errors.email.message)}</p>
)}
<Button type='submit'>Send</Button>
    
<Button type='button' onClick={navigate}>Add contact</Button>
</form>
      </Chatbox>
   

    </div>
  )
}

export default page
