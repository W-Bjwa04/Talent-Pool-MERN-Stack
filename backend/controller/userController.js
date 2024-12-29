import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js"
import { sendToken } from "../utils/jwtToken.js";





// method for register the user  

export const register = catchAsyncError(async (req, res, next)=>{
    
    const { name, email, phone,role,password } = req.body;
    if (!name || !email || !phone || !password || !role) {
        return next(new ErrorHandler("Please fill full form!"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("Email already registered!"));
    }
    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
    });

    sendToken(user, 200, res, "User Registered Successfully");
})



// method for login the user 

export const login = catchAsyncError(async (req,res,next)=>{

    const {email,password, role} = req.body;

    if(!email || !password || !role){
        return next(new ErrorHandler("Please provide email and password and role!"));
    }
    console.log(role);
    
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("User not found!"));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password!"));
    }

    if(user.role !== role){
        return next(new ErrorHandler("Invalid role!"));
    }

    sendToken(user, 200, res, "User Login Successfully");
})



// controller for the user logout 

//logout means the cookie stored by the user in the browser will be deleted

export const logout = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "User Logged Out Successfully"
    })
})

export const getUser = catchAsyncError((req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
});