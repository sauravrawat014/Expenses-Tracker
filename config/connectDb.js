const mongoose = require("mongoose");

const connectDb = async()=>{
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log("connection is established");
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDb;