import { FastifyReply, FastifyRequest } from 'fastify';
interface customreq extends FastifyRequest {
    userId?: string;
}
export declare const queryaccessfilter: (req: customreq, resp: FastifyReply) => {
    userId: any;
};
export {};
//# sourceMappingURL=queryaccessfilter.d.ts.map