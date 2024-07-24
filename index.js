const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const userForm = new mongoose.Schema({
  myName: String,
  mySID: String,
});
// Create a Model object
const Form = mongoose.model('Form', formSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const { mongoURI } = req.body;
  const myName = "Buu Nguyen";
  const mySID = "300343373"
  // connect to the database and log the connection
try {
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  // add the data to the database
  const newForm = new Form({ myName, mySID });
  await newForm.save();

  res.send('<h1>Document Added</h1>');
} catch (error) {
  console.error('Error connecting to MongoDB or saving document:', error);
    res.status(500).send('<h1>Error adding document</h1>');
} 

});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
