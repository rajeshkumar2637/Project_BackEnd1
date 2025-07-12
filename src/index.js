import dotenv from "dotenv";
dotenv.config({
    path:"../.env"
});
import express from "express";

import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js";

const app = express();

connectDB()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error=>{
    console.log("Mongo DB Connection falied !", error);
}))
