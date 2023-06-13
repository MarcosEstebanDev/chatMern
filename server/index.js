import express from "express";
import morgan from "morgan";
import dotenv from 'dotenv'

import { Server as SocketServer } from "socket.io";
import http from 'http';
import cors from 'cors';

import mongoose from "mongoose";
import bodyParser from "body-parser";

import router from './routes/message.js '
// CONFIG DB

const db = 'mongodb+srv://marcos:asd123@cluster0.jgwkeki.mongodb.net/'

mongoose.Promise = global.Promise

    const app = express()
    const PORT = 4000

    //SERVIDOR HTTP

    const server = http.createServer(app)
    const io = new SocketServer(server, {
        cors:{
            origin:'*'
        }
    })

//MIDDLEWARES

app.use(cors())
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', router)


io.on('connection',(socket)=>{
    console.log(socket.id)
    console.log('Cliente conectado')
    socket.on('message',(message,nickname)=>{
        socket.broadcast.emit('message',{
            body: message,
            from: nickname
        })
    })
})
//CONECTAR DB *.* CONECTAMOS PUERTOS

mongoose.connect(db, { useNewUrlParser:true }).then(() =>{
    console.log('BD CONECTADA')
    server.listen(PORT,()=>{
        console.log('Servidor en http://localhost:',PORT)
    })
})
