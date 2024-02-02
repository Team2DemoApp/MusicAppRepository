const Mongoose = require("mongoose")
const localDb = "mongodb://127.0.0.1:27017/testdb";

const connectDb = async () => {
    await Mongoose.connect(localDb)
    console.log("DB Connected") 
}

module.exports = connectDb