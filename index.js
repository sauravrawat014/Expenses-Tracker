const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");
const path = require('path');
const connectDb = require("./config/connectDb");
const userRoute = require("./routes/userRoutes");
const transactionRoute = require("./routes/transactionRoutes");
dotenv.config();
connectDb();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// const _dirname = path.resolve();

// user routes

app.use("/api/v1/users", userRoute);

// transaction routes

app.use("/api/v1/transactions", transactionRoute);

app.use(express.static(path.join(__dirname, "./frontend/dist")));
//  app.get("*", function(req,res){
//     res.sendFile(path.resolve(__dirname, './frontend/dist/index.html'));

//  });


const port = 8080 || process.env.PORT;

app.listen(port, ()=>{
    console.log("connection is established");
});