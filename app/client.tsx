"use client"

import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { ApolloProvider } from "@apollo/client/react";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { useAuth } from "@/lib/token";
import { useMemo } from "react";



export const Apollowrapper=({children}:{children:React.ReactNode})=>{

    const {getaccess}=useAuth()
const memoclient=useMemo(()=>{
    const wslink=new GraphQLWsLink(createClient({
        url:"ws://localhost:4000/graphql",
        connectionParams:()=>{
            const token=getaccess()
            return{
                Authorization: token ? `Bearer ${token}` : ""
            }
        }
    }))

    const httplink=new HttpLink({
        uri:"http://localhost:4000/graphql"
    })
    
    const splitlink=split(
        ({query})=>{
            const defination=getMainDefinition(query);
            return(
                defination.kind === "OperationDefinition" && 
                defination.operation === "subscription"
            )
        },
        wslink,
        httplink
    )


    const authlink=setContext((_,{header})=>{
        const token=getaccess()
        return{
            header:{
                ...header,
                Authorization:token ? `Bearer ${token}` : "" 
            }
        }
        
        })

        return new ApolloClient({
            link:authlink.concat(splitlink),
            cache:new InMemoryCache()
        })
        

},[getaccess])

    return(
        <ApolloProvider client={memoclient}>{children}</ApolloProvider>
    )

}

