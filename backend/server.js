require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");

const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

//express app
const app = express();

//middleware
/* uses for post and patch requests to make the data representation suitable for the backend which helps to access the req.body */
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
//just to show the api is running
app.get("/", (req, res) => {
    res.json({mssg: "hello Welcome to the app"})
})
//Routes
/* app.use accepts to aprameters one is routing endpoint and the second is the route itself and interpret it into get or post or other */
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//connect to a db
mongoose.connect(process.env.MONGO_URI)
    .then(() => { 
       //listen for requests
    app.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT} and connected to db`)
 })
     })
    .catch((error) => {
        console.log(error)
    })







