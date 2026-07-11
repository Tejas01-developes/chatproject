import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
interface customreq extends FastifyRequest {
    userId?: string;
}
export declare const accessfilter: (req: customreq, resp: FastifyReply, next: HookHandlerDoneFunction) => FastifyReply<import("fastify").RouteGenericInterface, import("fastify").RawServerDefault, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown> | undefined;
export {};
//# sourceMappingURL=accessfilter.d.ts.map