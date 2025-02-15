const mongoose = require("mongoose");
const tagSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course",
    },
})

module.exports = mongoose.model("tags", tagSchema);