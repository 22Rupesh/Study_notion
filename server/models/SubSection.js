const mongoose = require("mongoose");
const subSectionSchema = new mongoose.Schema({
    title:{
        type:String,
        // trim:true,
        require:true
    },
    timeDuration:{
        type:String,

    },
    description:{
        type:String,
        // trim:true,
    },
    videoUrl:{
        type:String,
    }
})

module.exports = mongoose.model("SubSection", subSectionSchema);