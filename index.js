const express = require('express');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const axios = require('axios')
const cors=require("cors")
const users = require('./userSchema');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const app = express();
const http = require('http').createServer(app)
const socketIo =require('socket.io')(http)
app.use(express.json())
app.use(multer().any())
app.use(cors())
app.use(expressSession({
	"key": "user_id",
	"secret": "User secret object ID",
	"resave": true,
	"saveUninitialized": true
}));
mongoose.connect('mongodb+srv://kishor7008:kishor7008@cluster0.q1t2i8w.mongodb.net/test',{
    useNewUrlParser:true
})
.then(()=>console.log('Db is connected'))
.catch((err)=>console.log(err.message))


// app.post('/api/admin/register', async(req,res)=>{
//   const {name, email, mobile, password} = req.body
//   if(!name || !email || !mobile || !password){
//     return res.status(422).send({status:false, message:"Invalid input"})
//   }
//    req.body.password = await bcrypt.hash(req.body.password, 10)
//   await users.create(req.body)
//   return res.status(201).send({status:false, message:"Register successfull"})
// })

// app.post('/api/admin/login', async(req,res)=>{
//   const {email, password} = req.body
//   const isValidAdmin = await users.findOne({email:email})
//   if(!isValidAdmin){
//     return res.status(403).send({status:false,message:"Invalid! Email"})
//   }
//   let isValidPassword = await bcrypt.compare(req.body.password, isValidAdmin.password)
//   if(!isValidPassword){
//     return res.status(403).send({status:false,message:"Invalid! Password"})
//   }
//   let token = jwt.sign({
//     userId: isValidAdmin._id
//   },
//   "ifyouchallengemeicanbeatyou"
//   )
//   req.session.user_id = isValidAdmin._id
//  // res.setHeader(token)
//   res.status(200).send({status:true, message:"Login successfull", token:token})
//})

app.post('/api/sensor-data',async(req,res)=>{
  if(Object.keys(req.body).length == 0){
    return res.status(201).send({status:false, message:"Body data is empty"})
  }
  let data = await users.findOneAndUpdate({_id:"6443cbfa6affb1570c723595"}, {test:{$push:req.body}}, {new:true})
  res.send(data)
  
})
app.get("/get/data",(req,res)=>{
  res.send("Hello")
})

app.listen(process.env.Port||8080, ()=>{
    console.log('server started on',process.env.Port||8080)
})