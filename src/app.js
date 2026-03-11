const express=require("express");
const songRoute=require("./router/songs.router")

const app=express();
app.use("/",songRoute);

module.exports=app;