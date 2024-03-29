require('dotenv').config();
const util        = require('util');
const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const moment      = require('moment');
const logger      = require('../util/logger');
const redisClient = require('../redis.config');

module.exports = router;