import fastify from 'fastify';
import cors from '@fastify/cors';
import formbody from '@fastify/formbody';
import cookie from '@fastify/cookie'
import { routes } from './routers/routes';
import dnconnect from './dbconnect/dbconnect'




const app=fastify({logger:true})

app.register(cors,{
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:true,
})
app.register(routes,{prefix:"/apis"})
app.register(formbody)
app.register(cookie)
// app.register(mercurius,{
//     resolvers:resolve,
//     schema:routeschema,
//     graphiql:true,
//     context:buildcontext
// })
// app.register(router,{prefix:"/apis"})

app.listen({port:4000},async()=>{
    await dnconnect.connect()
    console.log("server started on the port 4000")
})