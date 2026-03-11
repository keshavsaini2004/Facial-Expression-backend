const mongoose = require("mongoose");

function connectToDb(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connected To DB")
    })
}

module.exports=connectToDb