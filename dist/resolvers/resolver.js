"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = void 0;
const messageschema_1 = require("../schemas/messageschema");
const sublisten = "subscribe";
exports.resolve = {
    Mutation: {
        sendmsg: async (_parent, args, _ctx) => {
            const user = _ctx.userId;
            // console.log("userid",user)
            if (!user) {
                return {
                    success: false,
                    message: "no Auth"
                };
            }
            const { message } = args;
            if (!message) {
                return {
                    success: false,
                    message: "no message recived to server"
                };
            }
            const message_id = crypto.randomUUID();
            await messageschema_1.message_collection.create({ message_id, from: user, to: args.toid, message });
            const livemsg = {
                message: message
            };
            _ctx.pubsub.publish({
                topic: sublisten,
                payload: {
                    sendmessage: livemsg
                }
            });
            return {
                success: true,
                message: "message send"
            };
        }
    },
    Query: {
        getmessage: async (_parent, _args, _ctx) => {
            const { toid } = _args;
            const user = _ctx.userId;
            if (!user) {
                return {
                    success: false,
                    message: "no Auth"
                };
            }
            try {
                const res = await messageschema_1.message_collection.find({ from: user, to: toid });
                if (res.length === 0) {
                    return {
                        success: false,
                        message: "no message with your contact"
                    };
                }
                return res;
            }
            catch (err) {
                console.log("query error", err);
            }
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