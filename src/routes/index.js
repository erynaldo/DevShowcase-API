const router = require('express').Router();
router.use('/profiles', require('./profile.routes'));
router.use('/projects', require('./project.routes'));
router.use('/technologies', require('./technology.routes'));
module.exports = router;
