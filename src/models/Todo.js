import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    description : {
        type : String,
        required : true,
    },
    isCompleted : {
        type: Boolean,
        default : false,
        requires : true
    },
    priority : {
        type: Number,
        requires : true
    },
    dueDate : {
        type : Date,
        default : Date.now
    },
    date : {
        type : Date,
        default : Date.now
    }
});

export default mongoose.model("Todo",todoSchema);