"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const formbody_1 = __importDefault(require("@fastify/formbody"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const routes_1 = require("./routers/routes");
const dbconnect_1 = __importDefault(require("./dbconnect/dbconnect"));
const app = (0, fastify_1.default)({ logger: true });
app.register(cors_1.default, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
});
app.register(routes_1.routes, { prefix: "/apis" });
app.register(formbody_1.default);
app.register(cookie_1.default);
// app.register(mercurius,{
//     resolvers:resolve,
//     schema:routeschema,
//     graphiql:true,
//     context:buildcontext
// })
// app.register(router,{prefix:"/apis"})
app.listen({ port: 4000 }, async () => {
    await dbconnect_1.default.connect();
    console.log("server started on the port 4000");
});
//# sourceMappingURL=app.js.map