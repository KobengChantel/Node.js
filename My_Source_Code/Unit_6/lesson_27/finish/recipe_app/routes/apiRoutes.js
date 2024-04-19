"use strict";

const router = require("express").Router(),
  coursesController = require("../controllers/coursesController");

router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON
);// add api route to the expresss.js router
router.use(coursesController.errorJSON);//adding api error handling middleware

module.exports = router;
