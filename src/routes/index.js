const router = require('express').Router();
router.use('/profiles', require('./profile.routes'));
router.use('/projects', require('./project.routes'));
router.use('/technologies', require('./technology.routes'));
router.use('/feedbacks', require('./feedback.routes'));
router.use('/projects/:id/feedbacks', require('./feedback.routes'));
module.exports = router;
