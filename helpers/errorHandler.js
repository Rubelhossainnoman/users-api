// create and export error handler 
export const errorHandler = (error,req,res,next) =>{
    // check valication
    const status = res.statusCode ? res.statusCode : 500

    // send response
    return res.status(status).json(error.message);
}
