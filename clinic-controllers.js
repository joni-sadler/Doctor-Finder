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


const getSingleClinic = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("healthcare_database");
    console.log("connected!");
    console.log(req.params.id);
    const data = await db.collection("clinics").findOne({ "_id": ObjectId(req.params.id) });
    console.log(data);
    res.status(200).json({ status: 200, data: data });

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }

  client.close();
  console.log("disconnected");
}


module.exports = { addClinic, getWalkInClinics, getAppointmentClinics, getSingleClinic };
