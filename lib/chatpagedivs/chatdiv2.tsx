import { ReactNode } from "react"

interface contactsideprop{
    children:ReactNode
}


export const Chatbox=({children}:contactsideprop)=>{
    return(
        <div className="h-[100vh] w-[70vw] border border-black-300 ">
            {children}
        </div>
    )
}