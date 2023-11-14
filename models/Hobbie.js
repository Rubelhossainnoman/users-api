// package init 
import mongoose from "mongoose";

// craete hobbie schema
const hobbieSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    status : {
        type : Boolean,
        default : true
    },
    trash : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

// Create and export hobbie collection
export default mongoose.model("Hobbie", hobbieSchema);
