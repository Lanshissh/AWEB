// npm i express cors 

//This file is saved inside the 'api' folder.

// import all packages installed
var Express = require('express');
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

//Create an instance of express app
var app=Express();
//Make use of the CORS module
app.use(cors());
app.use(Express.json());

//Indicate the connection string from mongodb
var CONNECTION_STRING = "mongodb+srv://lanshish:lanshishpogi@cluster0.ajksj.mongodb.net/"
// ^ EDIT ME

//Indicate the name of the database
var DATABASENAME = "disiplina_db";
// ^ EDIT ME

//instantiate the mongodbclient
var database;

//create a listener
app.listen(5038, ()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log(`Yay! Now connected to Cluster`);
    })
})


//ROUTES TO ALL ACTIONS

//get all donations
app.get('/api/donate/GetDonations',(req, res) => {
    database.collection("disiplina").find({}).toArray((error,result)=>{
        res.send(result);
    })
})

// post donation form
app.post('/api/donate/AddDonation', multer().none(), async (req, res) => {
    try {
        const numOfDocs = await database.collection("disiplina").countDocuments();
        await database.collection("disiplina").insertOne({
            id: (numOfDocs + 1).toString(),
            name: req.body.name,
            email: req.body.email,
            amount: req.body.amount,
            message: req.body.message,
            // add mula ulit keni reng aliwang fields
        });
        res.json("Added Successfully");
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ error: "Failed to add book" });
    }
});

// delete donation form
app.delete('/api/donate/DeleteDonation', (req, res)=>{
    database.collection("disiplina").deleteOne({
        id:req.query.id
    });
    res.json("Deleted successfully!");
})