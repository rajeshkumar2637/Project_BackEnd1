import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


// 1 it is used to read the json file 
app.use(express.json({limit:"10kb"}));
// 2 it is used to read the url 
app.use(express.urlencoded({extended:true, limit:"10kb"}));
// 3 
app.use(express.static("public"));


app.use(cookieParser());


export {app}

