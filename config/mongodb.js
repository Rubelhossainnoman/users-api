// package init
import mongoose from "mongoose";

// create and export connection
export const connectDB =async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDb connect successfull`.bgCyan.black);
    } catch (error) {
        console.log(`MongoDB connect fail`.bgRed.black);
    }
};