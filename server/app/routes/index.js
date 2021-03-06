'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/tours', require('./tours'));
router.use('/speech-recognition', require('./speech-recognition'));
router.use('/s3', require('./s3'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});