const express = require("express");
const bodyParser = require('body-parser');
const PORT = 5000;
const connectDB = require("./db"); 
const app = express()
const userRoutes = require('./routes/userRoutes');

//output in console
const server = app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`)) 

process.on("unhandledRejection", err => {
  console.log(`DB error: ${err}`)
  server.close(() => process.exit(1))
})

connectDB();

app.use(bodyParser.json());
app.use("/", userRoutes);

app.use("/music", userRoutes);