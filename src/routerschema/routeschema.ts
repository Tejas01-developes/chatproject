export const routeschema=`
type responsetype{
    success:Boolean
    message:String
}

type Mutation{
sendmsg(message:String!,toid:String!):responsetype
}

type msgtype{
    message:String
}


type Query{
    getmessage(toid:String!):[msgtype!]!
}


type Subscription{
    sendmessage:msgtype
}

`