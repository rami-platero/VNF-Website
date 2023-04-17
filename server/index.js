import * as dotenv from 'dotenv'
dotenv.config()
import { connect } from "mongoose";

export const connectDB = async ()=> {
    try {
        await connect(process.env.MONGO_DB)
        console.log('connected to db')
    } catch (error) {
        console.log("error, couldn't connect to DB")
    }
}
connectDB()

import { MongoClient, ServerApiVersion } from 'mongodb';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_DB, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


import app from './app.js'
import nodemon from 'nodemon'


app.listen(app.get('port'))
console.log("PORT:", app.get('port'))
