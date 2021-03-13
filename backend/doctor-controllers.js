const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}


const addDoctor = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  console.log(req.body);

  await client.connect();

  try {

    const db = client.db("healthcare_database");
    console.log("connected!");

    await db.collection("doctors").insertOne(req.body);

    res.status(201).json({ status: 201, data: req.body });

  } catch (err) {
      console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  }

  client.close();
  console.log("disconnected");
}

const getDoctors = (req, res) => {
  // ingest clinic list to MongoDb and get here
}

const getSingleDoctor = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  // console.log(req.body);
  const _id = req.params._id
  console.log(_id);

  await client.connect();

  const db = client.db("healthcare_database");
  console.log("connected!");

  await db.collection("doctors").findOne({_id}, (err, result) => {
    result
    ? res.status(200).json({ status: 200, _id, data: result })
    : res.status(404).json({ status: 404, _id, data: err });
    client.close();
  });
}



module.exports = { addDoctor, getDoctors, getSingleDoctor };
