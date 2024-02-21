const Mongoose = require("mongoose")
const localDb = "mongodb://127.0.0.1:27017/testdb";
//const DbConnection = "mongodb+srv://sushmitadube:BioYf8yWtcFo8C2d@musicappdb.sxtkklw.mongodb.net/MusicAppDB"; 

const connectDb = async () => {
    await Mongoose.connect(localDb)
    console.log("DB Connected") 
}

module.exports = connectDb