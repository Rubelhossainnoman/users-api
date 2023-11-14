// package init
import mongoose from "mongoose";

// create user schema
const userSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        min : 3,
        max : 15
    },
    userName : {
        type : String,
        trim : true,
        default : null
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    password : {
        type : String,
        trim : true,
        required : true
    },
    about : {
        type : String,
        trim : true,
        default : null
    },
    phone : {
        type : String,
        trim : true,
        default : null
    },
    gender : {
        type : String,
        trim : true,
        enum : ["Male", "Female","Custom"]
    },
    age : {
        type : Number,
        trim : true,
        min : 10,
        max : 45,
        default : null
    },
    location : {
        type : String,
        trim : true,
        default : null
    },
    hobbie : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Hobbie",
        trim : true,
        default : null
    },
    userPhoto : {
        type : String,
        trim : true,
        default : null
    },
    galleryPhoto : {
        type : Array,
        trim : true,
        default : null
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
});

// Create statics method : getAllUser
userSchema.statics.getAllUsers = function(){
    return this.find();
}

// Create statics method : getSingleUser
userSchema.statics.getSingleUser = function(value){
    return this.findById(value);
}

// Create statics method : deleteSingleUser
userSchema.statics.deleteSingelUser = function(value){
    return this.findByIdAndDelete(value);
}

// create and export user collection
export default mongoose.model("User", userSchema);