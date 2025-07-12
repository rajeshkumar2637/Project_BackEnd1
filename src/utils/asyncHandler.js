//const asyncHandler=()=>{}
// const asyncHandler=(fn)=>{}
// const asyncHandler=(fn)=>async()=>{}



// 1 using promise syntax

// const asyncHandler=(requestHandler)=>{
//  (req, res, next)=>{
//    promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err))
//  }
//}


// 2 using normal syntax 


const asyncHandler=(fn)=>async(req, res, next)=>{

try{
    await fn(req, res, next)
}
catch(err){
   res.status(err.code || 500).json({
    success:false,
    message:err.message
   })
    process.exit(1);
}


}


export { asyncHandler }

