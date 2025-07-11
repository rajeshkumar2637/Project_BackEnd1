import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
         fullName:{
            type:String,
            required:true,
            trim:true,
            
        },
        id:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:[true, "password must be required"],
            unique:[true, "Must be unique"],
            minlength:[6, "Password must be at least 6 characters long"]
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
           
        ],
        avatar:{
            type:String, // Cloudinary url 
            required:true,

        }
        coverImage:{
            type:String, // Cloudinary url 

        },
        refreshToken:{
            type:String
        }



}
,{timestapms:true})


userSchema.pre("save", async function(next) {
    if(!this.isModified("password"))  return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect= async function
(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken=function()
{
   return jwt.sign(
        {
            _id=this._id,
            email=this.email,
            username=this.username,
            fullName=this.fullName
        }
    )
    process.env.ACCESS_TOKEN_SECRET{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
}

userSchema.methods.generateRefreshToken=function()
{
    return jwt.sign(
        {
            _id=this._id,
           
        }
    )
    process.env.REFRESH_TOKEN_SECRET{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
}

export const User=mongoose.model("User", userSchema);

