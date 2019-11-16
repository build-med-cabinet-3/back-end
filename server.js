const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet())
server.use(cors())
server.use(express.json())


server.use('/user', authRouter);
server.use('/product', authenticate , productRouter);






module.exports = server;