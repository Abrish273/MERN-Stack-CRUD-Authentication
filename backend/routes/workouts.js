//we are not allowed in here to use the api endpoints so we use express router
const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// the middleware is an authorization middleware
//fires the middleware before any other routing
router.use(requireAuth);
/* this slash continues after /api/workouts/ */
/* get all workouts */
router.get("/", getWorkouts);
/* get a single workout */
router.get("/:id", getWorkout);
/* create a workout */
router.post("/", createWorkout);
/* delete a workout */
router.delete("/:id", deleteWorkout);
/* update a workout */
router.patch("/:id", updateWorkout);

module.exports = router;
