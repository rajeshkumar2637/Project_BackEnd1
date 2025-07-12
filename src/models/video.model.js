import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema
(
{

id:{
    type:String,
    required:true,
    unique:true,
    index:true
},
title:{
    type:String,
    required:true,
    trim:true,

},
videoFile:{
    type:String, // Cloudinary url
    required:[true, "Must be required"]
},
description:{
    type:String,
    required:true,
},

thumbnail:{
    type:String, // Cloudinary url  
    required:true,
},

likes:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"User",
},

views:{
    type:Number,
    default:0,
},
duration:{
    type:Number,
    required:true, // in seconds

},
comments:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"Comment",
},
isPublished:{
    type:Boolean,
    default:true,
},
createdAt:{
    type:Date,
    default:Date.now
},
updatedAt:{
    type:Date,
    default:Date.now
},
owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
}


}
,{
    timestamps:true
});


videoSchema.plugin(mongooseAggregatePaginate);

export const Video=mongoose.model("Video", videoSchema);



