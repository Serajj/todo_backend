import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
    fullname : {
        type : String,
        min:2,
        max : 32
    },
    username:{
        type : String,
        min:4,
        max : 32,
        required:true
    },
    email:{
        type : String,
        min:5,
        max : 50,
        required:true
    },
    password:{
        type : String,
        min:4,
        max : 32,
        required:true
    },
    mobile:{
        type : String,
        min:10,
        max : 10,
    },
    todos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Todo",
    }],

    date:{
        type : Date,
        default : Date.now
        
    }
});

export default mongoose.model("User",userSchema);