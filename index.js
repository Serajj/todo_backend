
import express from "express";
import apiRoutes, { apiAuthRoutes } from "./src/utils/api.js";
import mongoose from "mongoose";
import { MONGO_DB_URL } from "./src/utils/constants.js";
import AuthMiddleware from "./src/middlewares/AuthMiddleware.js";

const app = express();
const PORT = 8000;

//connect database
mongoose.connect(MONGO_DB_URL,{useNewUrlParser:true}).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
  });

//to parse the request body
app.use(express.json());
//adding api routes
app.use('/api/',apiRoutes);
app.use('/api/',AuthMiddleware,apiAuthRoutes);
app.get('/',(req,res)=>{
  res.send("Welcome to server!!");
});

//running server 
app.listen(PORT,()=>console.log("Server is running at port : " + PORT));

