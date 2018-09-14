const express = require('express');
const upload = require('multer')();
const feeds = require('./../controllers/feeds');
const users = require('./../controllers/user');
const media = require('./../controllers/media');
const tweet = require('./../controllers/tweet');
const router = express.Router();

router.get('/feeds/:token', feeds);
router.get('/users/:token', users);
router.post('/media/:token', upload.any(), media);
router.post('/tweet/:token', tweet);

module.exports = router;
