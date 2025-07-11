import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config({
    path:"../../.env"
});

import {DB_NAME} from "../constants.js";
import express from "express";

const app=express();

console.log("MONGODB_URI:", process.env.MONGODB_URI);


const connectDB= async()=>{
    try{
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connection !! DB Host : ${
            connectionInstance.connection.host
        } \n`);

        
        app.on("error", (error)=>{
            console.log("ERRORS : ", error);
            throw error;
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
    
    catch(error){
        console.error("MongoDB connection ERROR :", error);
       
        process.exit(1);
    }
};


export default connectDB;



