const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
// const User = require("../models/User").default
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")


// const { v4: uuidv4 } = require('uuid');

//  FOR MULTIPLE ITEM



// INITIATE THE RAZORPAY ORDER    

exports.capturePayment = async (req, res) => {

  console.log("Full request body:", req.body)

  const { courseId } = req.body;
  const userId = req.user.id;
  
  // console.log("Course detail", courseId)
  // console.log("User details", userId)

  if (courseId.length === 0) {
    return res.json({ success: false, message: "Please provide course Id" });
  }

      // // ✅ Check if courses is an array and not empty
      // if (!courses || !Array.isArray(courses) || courses.length === 0) {
      //   return res.status(400).json({ success: false, message: "Please provide valid course IDs" });
      // }
  
      // // ✅ Check if user ID is valid
      // if (!userId) {
      //   return res.status(400).json({ success: false, message: "User ID not found" });
      // }

  let totalAmount = 0;

  for (const course_id of courseId) {
    let course;
    try {
      course  = await Course.findById(course_id);
      if (!course) {
        return res.status(200).json({ success: false, message: "Could not find the course" });
      }
      // console.log("Type of userId ",userId)

      const uid = new mongoose.Types.ObjectId(userId);
      // const uid = mongoose.Types.ObjectId.createFromHexString(userId);
      console.log('uid',uid)
      // const uid = new mongoose.Types.ObjectId(typeof userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({ success: false, message: "Student is already Enrolled" });
      }

      totalAmount += course.price;
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false, message: "Student is not Enrolled",
        message: error.message
      });
    }
  }


  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }
  // console.log("order resposnse details: ", options)

  try {
    const paymentResponse = await instance.orders.create(options);
    console.log("Payment response",paymentResponse)
    res.json({
      success: true,
      // message: paymentResponse,
      // key: process.env.RAZORPAY_KEY, 
      data: paymentResponse,
      
    })
    // console.log("Razor pay key ", process.env.RAZORPAY_KEY)
    
  }
  
  catch (error) {
    console.error("Razorpay Order Error:", error);
    
    return res.status(500).json({ success: false, message: "Could not Inititate Order", message:error.message });
  }

}



//  verify the payment

exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body.razorpay_order_id;
  const razorpay_payment_id = req.body.razorpay_payment_id;
  const razorpay_signature = req.body.razorpay_signature;
  const courses = req.body?.courseId;
  const userId = req.user.id;

  console.log("full body rdata", req.body)

  console.log("course data:",courses)
  console.log("razorpay_order_id data:",razorpay_order_id)
  console.log("razorpay_payment_id data:",razorpay_payment_id)
  console.log("razorpay_signature data:",razorpay_signature)
  console.log("userId data:",userId)
  console.log(" data:",razorpay_payment_id)

  if (!razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature || !courses || !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

    console.log("body data: ",body)
    console.log("expected signature data: ",expectedSignature)



  if (expectedSignature === razorpay_signature) {
    // enrolled kardo student ko

    await enrolledStudents(courses, userId, res);

    //  return res
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }
  return res.status(200).json({ success: false, message: "Payment Failedddd" })


}

const enrolledStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({ success: false, message: "Please Provide data for Courses or UserId" });
  }

  for (const courseId of courses) {
    try {
      // find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true },
      )

      if (!enrolledCourse) {
        return res.status(500).json({ success: false, message: "Course not Found" })
      }


      const courseProgress = await CourseProgress.create({
        courseID:courseId,
        userId:userId,
        completeVideos:[],
      })

      // find the student and add the course to their list of enrolledCourse

      const enrolledStudent = await User.findByIdAndUpdate(userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          }
        }, { new: true }
      )

      // bachhe ko mail send kar do
      const emailResponse = await mailSender(
        enrolledStudents.email,
        `Successfully Enrolled in ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
      )
      console.log("Email send successfully", emailResponse)
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:error.message})
    }
  }

}






exports.sendPaymentSuccessEmail = async(req,res)=>{
   const { orderId, paymentId, amount}=req.body;

  //  const orderId = uuidv4(); 

  //  console.log("Request Bodrry: ", req.body);


   const userId = req.user.id

  //  console.log("user id data: ",userId)
  //  console.log("orderId id data: ",orderId)
  //  console.log("paymentId id data: ",paymentId)
  //  console.log("amount id data: ",amount)

   if(!orderId || !paymentId || !amount || !userId){
    return res.status(400).json({success:false, message:"Please provide all the feilds"})
   }

   try{
    // student ko dhundo
    // console.log("USer detail", userId)
    const enrolledStudent = await User.find({ _id: userId });

    console.log("enrolled student details data",enrolledStudent)
    await mailSender (
      enrolledStudent.email,
      `Payment Recieved`,
      paymentSuccessEmail(`${enrolledStudent.firstName}`,
        amount/100,orderId,paymentId
      )
    )
   }
   catch(error){
    console.log("error i sending mail", error)
    return res.status(500).json({success:false, message:"Could not send email",message:error.message})
    
   }
}










//      FOR SINGLE ITEM

// // Capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//   const { courses } = req.body
//   const userId = req.user.id
//   if (courses.length === 0) {
//     return res.json({ success: false, message: "Please Provide Course ID" })
//   }

//   let total_amount = 0

//   for (const course_id of courses) {
//     let course
//     try {
//       // Find the course by its ID
//       course = await Course.findById(course_id)

//       // If the course is not found, return an error
//       if (!course) {
//         return res
//           .status(200)
//           .json({ success: false, message: "Could not find the Course" })
//       }

//       // Check if the user is already enrolled in the course
//       const uid = new mongoose.Types.ObjectId(userId)
//       if (course.studentsEnroled.includes(uid)) {
//         return res
//           .status(200)
//           .json({ success: false, message: "Student is already Enrolled" })
//       }

//       // Add the price of the course to the total amount
//       total_amount += course.price
//     } catch (error) {
//       console.log(error)
//       return res.status(500).json({ success: false, message: error.message })
//     }
//   }

//   const options = {
//     amount: total_amount * 100,
//     currency: "INR",
//     receipt: Math.random(Date.now()).toString(),
//   }

//   try {
//     // Initiate the payment using Razorpay
//     const paymentResponse = await instance.orders.create(options)
//     console.log(paymentResponse)
//     res.json({
//       success: true,
//       data: paymentResponse,
//     })
//   } catch (error) {
//     console.log(error)
//     res
//       .status(500)
//       .json({ success: false, message: "Could not initiate order." })
//   }
// }

// // verify the payment
// exports.verifyPayment = async (req, res) => {
//   const razorpay_order_id = req.body?.razorpay_order_id
//   const razorpay_payment_id = req.body?.razorpay_payment_id
//   const razorpay_signature = req.body?.razorpay_signature
//   const courses = req.body?.courses

//   const userId = req.user.id

//   if (
//     !razorpay_order_id ||
//     !razorpay_payment_id ||
//     !razorpay_signature ||
//     !courses ||
//     !userId
//   ) {
//     return res.status(200).json({ success: false, message: "Payment Failed" })
//   }

//   let body = razorpay_order_id + "|" + razorpay_payment_id

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(body.toString())
//     .digest("hex")

//   if (expectedSignature === razorpay_signature) {
//     await enrollStudents(courses, userId, res)
//     return res.status(200).json({ success: true, message: "Payment Verified" })
//   }

//   return res.status(200).json({ success: false, message: "Payment Failed" })
// }

// // Send Payment Success Email
// exports.sendPaymentSuccessEmail = async (req, res) => {
//   const { orderId, paymentId, amount } = req.body

//   const userId = req.user.id

//   if (!orderId || !paymentId || !amount || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide all the details" })
//   }

//   try {
//     const enrolledStudent = await User.findById(userId)

//     await mailSender(
//       enrolledStudent.email,
//       `Payment Received`,
//       paymentSuccessEmail(
//         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//         amount / 100,
//         orderId,
//         paymentId
//       )
//     )
//   } catch (error) {
//     console.log("error in sending mail", error)
//     return res
//       .status(400)
//       .json({ success: false, message: "Could not send email" })
//   }
// }

// // enroll the student in the courses
// const enrollStudents = async (courses, userId, res) => {
//   if (!courses || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please Provide Course ID and User ID" })
//   }

//   for (const courseId of courses) {
//     try {
//       // Find the course and enroll the student in it
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentsEnroled: userId } },
//         { new: true }
//       )

//       if (!enrolledCourse) {
//         return res
//           .status(500)
//           .json({ success: false, error: "Course not found" })
//       }
//       console.log("Updated course: ", enrolledCourse)

//       const courseProgress = await CourseProgress.create({
//         courseID: courseId,
//         userId: userId,
//         completedVideos: [],
//       })
//       // Find the student and add the course to their list of enrolled courses
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             courses: courseId,
//             courseProgress: courseProgress._id,
//           },
//         },
//         { new: true }
//       )

//       console.log("Enrolled student: ", enrolledStudent)
//       // Send an email notification to the enrolled student
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         `Successfully Enrolled into ${enrolledCourse.courseName}`,
//         courseEnrollmentEmail(
//           enrolledCourse.courseName,
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         )
//       )

//       console.log("Email sent successfully: ", emailResponse.response)
//     } catch (error) {
//       console.log(error)
//       return res.status(400).json({ success: false, error: error.message })
//     }
//   }
// }