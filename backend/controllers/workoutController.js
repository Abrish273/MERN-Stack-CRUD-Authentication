const workoutModel = require("../models/workouts");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  // to get all the datas
  // -1 will sort in a descending order or the newest one is at the top
  const workouts = await workoutModel.find({}).sort({ createdAt: -1 });
  // to get where the reps are equal to 20
  //const workouts = await workoutModel.find({ reps: 20 })
  res.status(200).json(workouts);
};
//get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  //checking the validity of the id in the type of mongoose object id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No such workout` });
  }

  const workout = await workoutModel.findById(id);
  if (!workout) {
    return res.status(404).json({ error: `No such workout` });
  }
  res.status(200).json(workout);
};
//create new workout
const createWorkout = async (req, res) => {
  // grab the values of title, reps and load from the frontend
  const { title, reps, load } = req.body;
  // adding a doc to db and sending a response back to the frontend
  /* let's check the reuired fields are empty or not */
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  // add doc to db
  try {
    const user_id = req.user._id;
    const workout = await workoutModel.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //for server checking
  //res.json({mssg: "create a workout"})
};
//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No such workout` });
  }
  //mongodb stored id property is _id
  const workout = await workoutModel.findByIdAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: `No such workout` });
  }
  res.status(200).json(workout);
};
//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No such workout` });
  }
  const workout = await workoutModel.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: `No such workout` });
  }
  res.status(200).json(workout);
};
module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
