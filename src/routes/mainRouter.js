const express = require('express');
const chaseRouter = require('./chaseRouter');

const mainRouter = express.Router();

    mainRouter.use("/yocket", chaseRouter);

module.exports = mainRouter