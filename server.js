const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const savedRouter = require('./routes/savedRouter');

const authenticate = require('./routes/authenticateMW')

server.use(helmet())
server.use(cors())
server.use(express.json())


server.use('/user', authRouter);
server.use('/product', authenticate ,productRouter);
server.use('/saved', savedRouter);






module.exports = server;