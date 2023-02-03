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
    res.send(workout.workouts);
});

app.post("/add", (req, res) => {
    let newWorkout = req.body;
    newWorkout.id = newWorkout.id;
    newWorkout.name = newWorkout.name;
    newWorkout.Reps = newWorkout.Reps;
    newWorkout.Weight = newWorkout.Weight;
    newWorkout.date = new Date().toLocaleDateString();
    workout.workouts.push(newWorkout);
    res.send(`Workout ${newWorkout.name} was added`);
});

app.delete("/delete/:id", (req, res) => {
    const workoutId = req.params.id;
    const workoutIndex = workout.workouts.findIndex(workout => workout.id === workoutId);

    if (workoutIndex === -1) {
        return res.status(404).send(`Workout with id ${workoutId} not found`);
    }

    workout.workouts.splice(workoutIndex, 1);
    res.send(`Successfully deleted workout with id: ${workoutId}`);
});

app.listen(PORT, ()=>{
    console.log("listening to port "+ PORT)
})