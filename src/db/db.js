const mongoose = require("mongoose");

function connectToDb(){
    mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("MongoDB connected:", mongoose.connection.name)
})
.catch((err)=>{
    console.log(err)
})
}

module.exports=connectToDb