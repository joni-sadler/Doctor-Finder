const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

// const create_clinic = (req, res) => {
//   const { clinic } = req.body; 
//   // add clinic to database
//   res.status(201).json({ message, clinic });
// }

const addClinic = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  console.log(req.body);

  await client.connect();

  try {

    const db = client.db("healthcare_database");
    console.log("connected!");

    await db.collection("clinics").insertOne(req.body);

    res.status(201).json({ status: 201, data: req.body });

  } catch (err) {
      console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  }

  client.close();
  console.log("disconnected");
}

const getClinics = (req, res) => {
  // ingest clinic list to MongoDb and get here
}

const getSingleClinic = (req, res) => {
  // get single clinic with params
  // const clinicId = req.params.id;
}


module.exports = { addClinic, getClinics, getSingleClinic };
