const express = require('express');
const courseController = require('../controllers/courseContoller');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();
router.route('/').post(roleMiddleware(["teacher","admin"]),courseController.createCourse); //http://localhost:3000/courses
router.route('/').get (courseController.getAllCourses); //http://localhost:3000/courses
router.route('/:slug').get (courseController.getCourse); //http://localhost:3000/courses/5e9f8f8f8f8f8f8f8f8f8f8
router.route('/enroll').post(courseController.enrollCourse); //http://localhost:3000/courses/enroll
router.route('/relaase').post(courseController.releaseCourse); //http://localhost:3000/courses/relaase
//page route kendine ait 

module.exports = router;
