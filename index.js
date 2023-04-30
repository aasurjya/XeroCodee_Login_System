const express = require("express");
const { default: mongoose } = require("mongoose");
const UserRouter = require("./routes/userRoutes");
const app = express();
const mongoose = require(mongoose);

app.use("/users", UserRouter)
app.use("note")
