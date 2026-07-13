interface msgtype {
    message: string;
    toid: string;
}
export declare const resolve: {
    Mutation: {
        sendmsg: (_parent: any, args: msgtype, _ctx: any) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    Query: {
        getmessage: (_parent: any, _args: any, _ctx: any) => Promise<any[] | {
            success: boolean;
            message: string;
        } | undefined>;
    };
    Subscription: {
        sendmessage: {
            subscribe: (_parent: any, _args: any, ctx: any) => any;
        };
    };
};
export {};
//# sourceMappingURL=resolver.d.ts.map