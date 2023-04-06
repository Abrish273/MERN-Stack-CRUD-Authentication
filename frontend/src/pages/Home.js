import { useEffect, useState } from "react";
import WorkoutDetails from "../components/workoutDetails";
import WorkoutForm from "../components/WorkoutForm";

import { useWorkoutsContext } from "../hooks/WorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  /// --> const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      // get the response from the backend api
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // we will recieve data in the form of json as we send it in json form and stored in json variable
      const json = await response.json();

      //checking we are getting the right response or not
      if (response.ok) {
        /* //if we get the right response
        ///--> setWorkouts(json) */

        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      // we must call it the fetchWorkouts
      fetchWorkouts();
    }
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="workouts">
        {
          // we want to check the presence of the workout and if there is render it
          // now by using map we have an access to individual workout
          workouts &&
            workouts.map((workout) => (
              // passing the workout as a workout object
              //now we have an access to the workout in the workoutDetails component
              <WorkoutDetails key={workout._id} workout={workout} />
            ))
        }
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
