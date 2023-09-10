const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 5000;


const app =express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://sayanmajumdar4444:Sayan4444@chat-app.tnb7thj.mongodb.net/Chat-App",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log("Database has connected Successfully")
}).catch((err)=>{
    console.log(err.message);
})

const server = app.listen(port, ()=>{
    console.log(`server started on port: ${port}`)
});