const express = require('express');
const chaseRouter = require('./chaseRouter');

const mainRouter = express.Router();

    mainRouter.use("/Yocket", chaseRouter);

module.exports = mainRouter