const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique:true,
  },
  password: {
    type: String,
    required: true, // Fixed typo from 'require' to 'required'
  },
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    require: true,
  },
  
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types here
      ref: "Course", // Ensure Course model is correctly defined
    }
  ],
  image: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: String,
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types here
      ref: "CourseProgress", // Ensure CourseProgress model is correctly defined
    }
  ],
});

// Export the model correctly
module.exports = mongoose.model("User", userSchema);
