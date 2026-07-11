"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const userauth_1 = require("../controller/userauth");
const accessfilter_1 = require("../tokenhandelling/accessfilter");
const routes = (fastify) => {
    fastify.post("/register", userauth_1.registeruser);
    fastify.post("/login", userauth_1.loginuser);
    fastify.post("/add", { preHandler: [accessfilter_1.accessfilter] }, userauth_1.adduser);
    fastify.get("/get", { preHandler: [accessfilter_1.accessfilter] }, userauth_1.getcontact);
};
exports.routes = routes;
//# sourceMappingURL=routes.js.map