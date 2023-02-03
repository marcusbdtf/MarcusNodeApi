const { response } = require("express")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const https = require("https")
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

const workout = {workouts: [{"id":"1","name": "Incline Dumbellpress", "Reps": "8", "Weight": "20kg", "date": "2023-02-02"},
{"id":"2","name": "Shoulderpress", "Reps": "8", "Weight": "17.5kg", "date": "2023-02-02"}, 
{"id":"3","name": "Dips", "Reps": "12", "Weight": "-14kg", "date": "2023-02-02"}]}

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.get("/log", (req, res) => {
    res.send(workouts);
});

app.post("/add", (req, res) => {
    let newWorkout = req.body;
    workout.workouts.id = newWorkout.id;
    workout.workouts.name = newWorkout.name;
    workout.workouts.Reps = newWorkout.Reps;
    workout.workouts.Weight = newWorkout.Weight;
    newWorkout.date = new Date();
    workout.workouts.push(newWorkout);
    res.send(newWorkout + " was added");
});

app.delete("/delete", (req, res) => {
    const workoutId = req.params.id;
    const workoutIndex = workout.workouts.findIndex(workout => workout.id === workoutId);

    if (workoutIndex === -1) {
        return res.status(404).send(`Workout with id ${workoutId} not found`);
    }

    workout.workouts.splice(workoutIndex, 1);
    res.sendFile(__dirname + "/delete.html");
    res.send(`Successfully deleted workout with id: ${workoutId}`);
});






app.listen(PORT, ()=>{
    console.log("listening to port "+ PORT)
})