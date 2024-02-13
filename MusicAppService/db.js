const Mongoose = require("mongoose")
const localDb = "mongodb://localhost:27017/DynamicWebsite";

const connectDb = async () => {
    await Mongoose.connect(localDb)
    console.log("DB Connected") 
}

module.exports = connectDb