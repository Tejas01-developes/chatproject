import { gql } from "@apollo/client";

export const addmessage=gql`
mutation sendMsg($message:String,$toid:String){
sendmsg(message:$message,toid:$toid){
success,
message
}
}

`

export const getmessage=gql`
query getMsg($toid:String){
    getmessage(toid:$toid){
        message
    }
}
`


export const subscribe=gql`
subscription sendSubmsg{
    sendmessage{
        message
    }
}
`