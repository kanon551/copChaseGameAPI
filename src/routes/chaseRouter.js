const express = require('express');
const asyncValidateToken = require('../middleware/validateTokenHandler');
const multer = require('multer');
const { exampleControllerExample } = require('../controllers/exampleController');
const upload = multer();


const chaseRouter = express.Router();

    chaseRouter.route("/test").get(exampleControllerExample);

module.exports = chaseRouter;