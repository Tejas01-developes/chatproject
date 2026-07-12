"use client"
import { Button } from '@/lib/buttons/button'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { Authcontext, useAuth } from '@/lib/token'
interface loginformtype{
  name:string
  email:string
  password:string
}

const page = () => {
const{register,handleSubmit,formState:{errors}}=useForm<loginformtype>()
const router=useRouter();
const{setaccess}=useAuth()


  
    const login=async(data:loginformtype)=>{
      try{
     const res= await axios.post("http://localhost:4000/apis/login",data,{withCredentials:true})
    if(res.data.success){
      setaccess(res.data.access)
       alert("Login success")
       return  router.replace("/chat")
   
    }
  }catch(err){
return alert("login failure")
  }
}

  

  return (
    <div>
      <form onSubmit={handleSubmit(login)}>
    <input type="text"  placeholder='Email' className='border border-gray-300' {...register("email",{required:"Email is required"})} />

{errors.email &&(
  <p>{String(errors.email.message)}</p>
)}

    <input type="password"  placeholder='Password' className='border border-gray-300' {...register("password",{required:"Password is required"})}/>

    {errors.password &&(
  <p>{String(errors.password.message)}</p>
)}


    <Button type='submit' >Login</Button>
    </form>
    <p>{errors.form?.message}</p>
    </div>
  )
}

export default page
