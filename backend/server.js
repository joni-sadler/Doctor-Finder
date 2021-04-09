const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const {
  addDoctor,
  getDoctorsAcceptingPatients,
  getAllDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
} = require("./doctor-controllers");
const {
  addClinic,
  getWalkInClinics,
  getAppointmentClinics,
  getAllClinics,
  getSingleClinic,
  updateClinic,
  deleteClinic,
} = require("./clinic-controllers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend server is working.");
});

// Get list of all clinics accepting walk-ins
app.get("/walk_in_clinics", getWalkInClinics);

// Get list of all clinics accepting appointments
app.get("/clinic_appointments", getAppointmentClinics);

// Get a list of all clinics registered in the database
app.get("/clinics", getAllClinics);

// Get single clinic
app.get("/clinics/:id", getSingleClinic);

// Add a clinic
app.post("/clinic_signup", addClinic);

// Update clinic profile
app.put("/clinic_profile/:id", updateClinic);

// Delete a clinic
app.delete("/clinic_profile/:id", deleteClinic);

// Get list of all doctors accepting patients
app.get("/doctor_finder", getDoctorsAcceptingPatients);

// Get a list of all doctors registered in the database
app.get("/doctors", getAllDoctors);

// Get a list of all doctors by specialty
app.get("/specialty/:specialty", getAllDoctors);

// Get single doctor
app.get("/doctors/:id", getSingleDoctor);

// Add a doctor
app.post("/doctor_signup", addDoctor);

// Update doctor profile
app.put("/doctor_profile/:id", updateDoctor);

// Delete a doctor
app.delete("/doctor_profile/:id", deleteDoctor);

// Catch-all endpoint
app
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
