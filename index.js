
import express from 'express';
import useRouter from './routes/user.js'

import connectMonngoDb from './connection.js';
import logReqRes  from './middeleware/index.js'

const app=express();

const PORT =3000;



connectMonngoDb("mongodb://127.0.0.1:27017/NodeJs_Practice")
.then( () =>  console.log("DB Conneected"))
.catch((err)=>console.log("mongo DB err",err))

//Middleware
app.use(express.urlencoded({extended:false}))


app.use(logReqRes('log.txt'))

app.use("/api/users",useRouter)


app.listen(PORT,()=>{
    console.log("server started on PORT",PORT)
})

