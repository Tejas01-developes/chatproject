import { gql } from "@apollo/client";

export const addmessage=gql`
mutation{
    sendmsg(message:$message){
        success
        message
    }
}
`

export const getmessage=gql`
query{
    getmessage(toid:$toid){
        message
    }
}
`


export const subscribe=gql`
subscription{
    sendmessage{
        message
    }
}
`