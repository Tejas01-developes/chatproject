"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeschema = void 0;
exports.routeschema = `
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

`;
//# sourceMappingURL=routeschema.js.map