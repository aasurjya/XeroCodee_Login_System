const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


//import routes
const authRoutes = require('./routes/auth');
const {db} = require('./database/user_schema');
const dbConnect = require('./database/connection');

//app
const app = express();
// db
dbConnect();

//middlewares
app.use(bodyParser.json());
app.use(cors());

//routes middleware
app.use('/users', authRoutes);

const port = process.env.PORT || 8000;



app.listen(port, () => {
  console.log(`Server is running on ${port}`)
});