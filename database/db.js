// const mongoose = require("mongoose");
// const Register = require("./user_schema")

// mongoose.connect("mongodb+srv://aasurjya:Passaasurjya%40123@cluster0.pumptse.mongodb.net/?retryWrites=true&w=majority", {useNewUrl:true, useUnifiedTolopogy: true})
// .then (()=>{
//     console.log("Connected to Mongodb Atlas");
//     const newUser = new Register({
//         username: "aasurjya",
//         email: "ahandique8@gmail.com",
//         password: "password123"
//     });
//     newUser.save()
//     .then(()=> console.log("User saved to database"))
//     .catch((errr)=> console.error(err));
// })
// .catch((err)=> console.log(err));

const { MongoClient } = require("mongodb");
const { getMaxListeners } = require("./user_schema");

async function run() {
  // TODO:
  // Replace the placeholder connection string below with your
  // Altas cluster specifics. Be sure it includes
  // a valid username and password! Note that in a production environment,
  // you do not want to store your password in plain-text here.
  const uri =
  "mongodb+srv://aasurjya:Passaasurjya%40123@cluster0.pumptse.mongodb.net/?retryWrites=true&w=majority";

  // The MongoClient is the object that references the connection to our
  // datastore (Atlas, for example)
  const client = new MongoClient(uri);

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
  await client.connect();

  // Provide the name of the database and collection you want to use.
  // If the database and/or collection do not exist, the driver and Atlas
  // will create them automatically when you first write data.
  const dbName = "myDatabase";
  const collectionName = "UserData";

  // Create references to the database and collection in order to run
  // operations on them.
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  /*
   *  *** INSERT DOCUMENTS ***
   *
   * You can insert individual documents using collection.insert().
   * In this example, we're going to create four documents and then
   * insert them all in one call with collection.insertMany().
   */

  const data = [
    {
        username: "aasurjya",
        email: "ahandique8@gmail.com",
        password: "password"
    }
  ];

  try {
    const insertManyResult = await collection.insertMany(data);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }
  await client.close();
};
run().catch(console.dir);