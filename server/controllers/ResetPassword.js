const User = require('../models/User'); // Adjust the path to your User model

const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");


//resetPAsswprdToken - mail send karne ka ye hi karega
exports.resetPasswordToken = async (req, res) => {
    try {
        // get email from req body
        const email = req.body.email;
        // check user for this email, email validation
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: 'Your Email is not registered with us'
            });
        }
        // generate token
        const token = crypto.randomUUID();
        // updaate user by adding token and expirations time
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );
        // create url
        const url = `http://localhost:3000/update-password/${token}`;

               // Debugging logs for mailSender
               console.log("Preparing to send email with the following details:");
               console.log("Recipient:", email);
               console.log("Subject: Password Reset Link");
               console.log("Body:", `Password Reset Link: ${url}`);
        // send mail containing the url
        // await mailSender(email,
        //     "Password Reset Link",
        //     `Password Reset Link: ${url} `
        // );
        await mailSender(email,
            "Password Reset Link",
            `Password Reset Link: ${url}`
        );
        // return response
        return res.json({
            success: true,
            message: 'Emil sent successfully, please check email and change pwd',
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            // message:error.message,
            message: 'Something went wrong while sending reset pwd mail',
            message:error.message
        })
    }




}



//reset PAssword - DB me update karne ka kaam ye hi karega

exports.resetPassword = async (req, res) => {
    try {
        // data fetch
        const { password, confirmPassword, token } = req.body;
        // validation
        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: 'Password not working',
            })
        }
        // get user details from db using token
        const userDetails = await User.findOne({ token: token });
        // if no entry -invalid token
        if (!userDetails) {
            return res.json({
                success: false,
                message: 'Token is invlid ',
            });
        }
        // token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "Token is expired, please regenerate your token",
            })
        }
        // hash pwd
        const hashedPassword = await bcrypt.hash(password, 10);
        // password update
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true },
        )
        //return response
        return res.status(200).json({
            success: true,
            message: 'Password reset successfully',
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Problem in reset Password',
            message:error.message
        })
    }

}