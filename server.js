const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');

const authenticate = require('./routes/authenticateMW')

server.use(helmet())
server.use(cors())
server.use(express.json())


server.use('/user', authRouter);
server.use('/product', productRouter);






module.exports = server;