import { FastifyReply, FastifyRequest } from 'fastify';
export declare const registeruser: (req: FastifyRequest, resp: FastifyReply) => Promise<void>;
export declare const loginuser: (req: FastifyRequest, resp: FastifyReply) => Promise<never>;
interface reqid extends FastifyRequest {
    userId?: string;
}
export declare const adduser: (req: reqid, resp: FastifyReply) => Promise<never>;
export declare const getcontact: (req: reqid, resp: FastifyReply) => Promise<never>;
export {};
//# sourceMappingURL=userauth.d.ts.map