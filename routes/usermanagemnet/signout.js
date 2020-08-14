const express = require('express');
const hash2 = require('../../public/javascripts/hashPassword.js');
const {signout} = require('../SDP.js');
const path = require('path');
// const {isLoggedIn} = require('../middleware.js');
let hashPassword = new hash2();

const app =express();

const router = express.Router();

module.exports = router;