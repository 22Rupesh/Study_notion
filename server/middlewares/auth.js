const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User").default;


//auth
exports.auth = async (req,res,next)=>{
    try{
        //extract token
        const token = req.cookies.token 
                || req.body.token 
                || req.header("Authorization").replace("Bearer ","");

        //if token missing, then return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }

        //verify the Token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error){
            //verification -issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }

    }
    catch{
        // console.error();
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token",
        })
    }
    next();
}


// isStudent
exports.isStudent = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Students Only',
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
    next();
}


//isInstructor
exports.isInstructor = async (req,res,next)=>{
    console.log(" yaha tak print ho raha ahai")
    try{
        
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Instructor Only',
            })
        }
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
    next();
    
}




//isAdmin

exports.isAdmin = async (req,res,next)=>{
    try{
        console.log("Printing Account Type", req.user.accountType)
        if(req.user.accountType !== "Admin"){
            console.log("return hoga ab")
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Admin Only',
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
    next();
}