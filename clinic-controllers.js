const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}


const addClinic = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("healthcare_database");
    console.log("connected!");
    await db.collection("clinics").insertOne(req.body);
    res.status(201).json({ status: 201, data: req.body });

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }

  client.close();
  console.log("disconnected");
}


const getWalkInClinics = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("healthcare_database");
    console.log("connected!");
    const data = await db.collection("clinics").find({ "acceptsWalkIns": true }).toArray();
    res.status(200).json({ status: 200, data: data });

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }

  client.close();
  console.log("disconnected");
}


const getAppointmentClinics = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("healthcare_database");
    console.log("connected!");
    const data = await db.collection("clinics").find({ "canBookAppointments": true }).toArray();
    res.status(200).json({ status: 200, data: data });

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }

  client.close();
  console.log("disconnected");
}


const getAllClinics = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("healthcare_database");
    console.log("connected!");
    const data = await db.collection("clinics").find().toArray();
    res.status(200).json({ status: 200, data: data });

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }

  client.close();
  console.log("disconnected");
}


const getSingleClinic = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("healthcare_database");
    console.log("connected!");
    console.log(req.params.id);
    const clinicData = await db.collection("clinics").findOne({ "_id": ObjectId(req.params.id) });
    const doctorDataPrimary = await db.collection("doctors").find({ "primaryClinic": clinicData.clinicName }).toArray();
    const doctorDataSecondary = await db.collection("doctors").find({ "secondaryClinic": clinicData.clinicName }).toArray();
    const doctorData = doctorDataPrimary.concat(doctorDataSecondary);
    console.log(doctorData)
    console.log(clinicData);
    res.status(200).json({ status: 200, data: clinicData, doctorData });

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }

  client.close();
  console.log("disconnected");
}


const updateClinic = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("healthcare_database");
    console.log("connected!");
    delete req.body._id;
    await db.collection("clinics").updateOne({"_id": ObjectId(req.params.id)}, { $set: {...req.body}});
    res.status(201).json({ status: 201, data: req.body });

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }

  client.close();
  console.log("disconnected");
}


const deleteClinic = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("healthcare_database");
    console.log("connected!");
    await db.collection("clinics").deleteOne({"_id": ObjectId(req.params.id)})
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }

  client.close();
  console.log("disconnected");
}

module.exports = { addClinic, getWalkInClinics, getAppointmentClinics, getAllClinics, getSingleClinic, updateClinic, deleteClinic };
