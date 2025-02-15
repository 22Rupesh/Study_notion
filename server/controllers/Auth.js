

const OTP = require("../models/OTP")

const User = require("../models/User")
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate")

const Profile = require("../models/Profile");

require("dotenv").config();


//sendOTP
exports.sendOTP = async (req, res) => {
    try {
        //fetch email from req
        const { email } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            });
        }

        //generate otp
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated: ", otp);

        //check uniqness
        const result = await OTP.findOne({ otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp });
        }

        const otpPayload = { email, otp };

        //create entry for otp
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

                // // Send OTP via email using mailsender
                // const emailSubject = "Your OTP Code";
                // const emailBody = `Your OTP code is: ${otp}`;
                // await mailSender(email);
                

        // return response
        res.status(200).json({
            success: true,
            meassage: "OTP sent successfully",
            otp,
        });
    } catch (error) {
        console.log("Error in generating opt", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
//signup
exports.signUp = async (req, res) => {

    try {
        //dat fetch from request ki body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;
        //validate krlo
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }


        //2 password match krlo
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and ConfirmPassword value does not matched, please try again',
            })
        }


        //check user already exist or not 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User is already registered',
            });
        }



        //find most recent OTP stored for the user 
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOtp);

        //validate OTP
        if (recentOtp.length === 0) {
            //OTP not found
            return res.status(400).json({
                success: false,
                message: 'OTP not Found',
            })
        } else if (otp !== recentOtp[0].otp) {
            //Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            })
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);
        //entry create in DB

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })


        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            // confirmPassword,
            // accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.c/initials/svg?seed=${firstName} ${lastName} `

        })

        //return res
        return res.status(200).json({
            success: true,
            message: "User is registered Successfully",
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, Please try latter",
            message:error.message
        })
    }




}




// Login

exports.login = async (req, res) => {
    try {
        //get data from req body
        const { email, password } = req.body;
        //vakidation data
        if (!email || !password) {
            // return 400 bad request status code with error
            return res.status(400).json({
                success: false,
                message: "Please Fill up All the required Fields",
            })
        }
        //user check exist or not
        const user = await User.findOne({ email }).populate("additionalDetails").exec();

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please Signup first",
            });
        }
        //generate JWT, after password matching
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            })
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged In Successfully",
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            })
        }


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure, please try again',
            message:error.message
        })
    }
}



//Change Password
exports.changePassword = async (req, res) => {
    //get data from req body
    const { password, confirmPassword } = req.body;
    //get oldPAssword, newPassword, confirmPassword
    // const {password, confirmPassword}  = req.body;


    //validation



    //update pwd in DB
    //send mail -Password updated
    //return response
}