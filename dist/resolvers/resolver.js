"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sublisten = "subscribe";
const resolve = {
    Mutation: {
        sendmsg: (_parent, _args, _ctx) => {
        }
    },
    Subscription: {
        sendmessage: {
            subscribe: (_parent, _args, ctx) => {
                return ctx.pubsub.subscribe(sublisten);
            }
        }
    }
};
//# sourceMappingURL=resolver.js.map