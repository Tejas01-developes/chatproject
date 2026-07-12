import { ReactNode } from "react"

interface contactsideprop{
    children:ReactNode
}

export const Contactside=({children}:contactsideprop)=>{
    return(
    <div className="h-[100vh] w-[30vw] border border-black-300 overflow-y-auto scrollbar-hide">
     {children}
    </div>
    )
}