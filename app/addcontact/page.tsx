"use client"
import { Button } from '@/lib/buttons/button'
import { Authcontext, useAuth } from '@/lib/token'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

interface addtype{
  email:string
}

const Addcontact = () => {
    const{register,handleSubmit,formState:{errors}}=useForm<addtype>()
    const{getaccess,setaccess}=useAuth()
    const token=getaccess()
    const router=useRouter();


const addcts=async(data:addtype)=>{
    try{
        console.log(getaccess())
        const res=await axios.post("http://localhost:4000/apis/add",data,{headers:{Authorization:`Bearer ${token}`}})
        if(res.data.success){
            alert("contact added")
            return router.replace("/chat")
        }
    }catch(err){
        return alert("add contect api failed")
    }
}



  return (
    <div>
      <form onSubmit={handleSubmit(addcts)}>
        <input type="text" {...register("email",{required:"write the email"})} placeholder='Email'  />
        {errors.email && (
            <p>{String(errors.email.message)}</p>
        )}
        <Button type='submit'>Add contact</Button>
      </form>
      
    </div>
  )
}

export default Addcontact
