const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')
// const studentRouter = require('../routers/studentRouter');
const cohortRouter = require ('../routers/cohortRouter')

const server = express();

server.use(express.json());
server.use(helmet());
server.unsubscribe(morgan('tiny'))

server.use('/api/cohorts', cohortRouter);

module.exports = server;