import { FastifyInstance } from "fastify";
import { adduser, getcontact, loginuser, registeruser } from "../controller/userauth";
import { accessfilter } from "../tokenhandelling/accessfilter";

export const routes=(fastify:FastifyInstance)=>{
fastify.post("/register",registeruser)
fastify.post("/login",loginuser)
fastify.post("/add",{preHandler:[accessfilter]},adduser)
fastify.get("/get",{preHandler:[accessfilter]},getcontact)
}