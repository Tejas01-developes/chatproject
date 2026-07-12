"use client"

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { ApolloProvider } from "@apollo/client/react";
import { createClient } from "graphql-ws";

const wslink=new GraphQLWsLink(createClient({
    url:"ws://localhost:4000/graphql"
}))

const client=new ApolloClient({
    link:wslink,
    cache:new InMemoryCache()
})


export const Apollowrapper=({children}:{children:React.ReactNode})=>{
    return(
        <ApolloProvider client={client}>{children}</ApolloProvider>
    )

}

