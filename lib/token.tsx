
"use client"

import { ReactNode, createContext, useContext, useState } from "react"

interface nodetype{
  children:ReactNode
}

interface authcontexttype{
  accesstkn:string | null
  setaccess:(token:string)=>void
  getaccess:()=> string | null
  clearaccess:()=>void
}


export const Authcontext=createContext<authcontexttype | null>(null)
export const Authservice=({children}:nodetype)=>{

  const[accesstkn,setaccesstkn]=useState<string | null>(null)

     const setaccess=(token:string)=>{
        return  setaccesstkn(token)
      }
      
      
       const getaccess=()=>{
          return accesstkn
      }
       const clearaccess=()=>{
      setaccesstkn("")
      }
      return(
        <Authcontext.Provider value={{accesstkn,setaccess,getaccess,clearaccess}}>{children}</Authcontext.Provider>
      )
    
} 

export const useAuth=()=>{
const auth=useContext(Authcontext)
if(!auth){
  throw new Error("Auth must be there")
}
return auth
}

