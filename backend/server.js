const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8000;
const { addDoctor, getDoctors, getSingleDoctor } = require("./doctor-controllers");
const { addClinic, getClinics, getSingleClinic } = require("./clinic-controllers");

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(bodyParser.json())

app.get("/", (req, res) => {
 res.send("Backend server is working.")
})

// Get list of all clinics
app.get("/healthcare_finder", getClinics)

// Get single clinic
app.get("/clinics/:id", getSingleClinic)

// Add a clinic
app.post("/clinic_signup", addClinic)

// Get list of all doctors
app.get("/healthcare_finder", getDoctors)

// Get single doctor
app.get("/doctors/:id", getSingleDoctor)

// Add a doctor
app.post("/doctor_signup", addDoctor)

// Catch-all endpoint
app.get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

.listen(PORT, () => console.info(`Listening on port ${PORT}`));

