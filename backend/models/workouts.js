const mongoose = require("mongoose");

const Schema = mongoose.Schema;
/* Schema defines the structure of that model */
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/* we use this in another file to interact with the model itself (or to our collection) to find, to post to update or any other in other files */
module.exports = mongoose.model("Workout", workoutSchema);
