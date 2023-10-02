const express = require('express')
const mongoose = require('mongoose');
const app = express()
var cors = require('cors')
const port = 5000

mongoose.connect("mongodb://127.0.0.1:27017/myfood?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB: ', err);
  });


  app.use(cors())
app.use(express.json());    //middelware
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})