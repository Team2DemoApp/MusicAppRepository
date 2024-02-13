require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const PORT = 5000;
const connectDB = require("./db"); 
const app = express()
const routes = require('./routes/routes');

//output in console
const server = app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`)) 

process.on("unhandledRejection", err => {
  console.log(`DB error: ${err}`)
  server.close(() => process.exit(1))
})

connectDB();

app.use(bodyParser.json());
app.use("/", routes);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});