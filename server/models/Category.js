
const mongoose = require("mongoose");

// Define Tag Schema
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    description : {type:String},
    courses: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        },
    ],
});

// Exports the Tags model
module.exports = mongoose.model("Category",categorySchema);