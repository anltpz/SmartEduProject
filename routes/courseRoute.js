const express = require('express');
const courseController = require('../controllers/courseContoller');

const router = express.Router();
router.route('/').post(courseController.createCourse); //http://localhost:3000/courses
router.route('/').get (courseController.getAllCourses); //http://localhost:3000/courses
router.route('/:slug').get (courseController.getCourse); //http://localhost:3000/courses/5e9f8f8f8f8f8f8f8f8f8f8

//page route kendine ait 

module.exports = router;
