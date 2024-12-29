import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        minLength:[3,"Name should be at least 3 characters long"],
        maxLength:[30,"Name should be at most 30 characters long"]
    }, 

    email:{
        type:String,
        required:[true,"Please enter your email"],
        validate:[validator.isEmail, "Please enter a valid email"]  //format should be of email
    }, 

    phone:{
        type:Number,
        required:[true,"Please enter your phone number"],
    }, 

    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be at least 8 characters long"],
        maxLength:[32,"Password should be at most 30 characters long"],
        select: false
    }, 

    role:{
        type:String,
        required:[true,"Please enter your role"],
        enum:["Job Seeker","Employer"],
    }, 

    createdAt:{
        type:Date,
        default:Date.now
    }
})


// encryption of the password 

//ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next()
  });

// compare the password coming from front end 

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

// generate JWT token  

userSchema.methods.getJWTToken = function() {
    return jwt.sign({id:this._id}, 
        process.env.JWT_SECRET_KEY, 
        {expiresIn:process.env.JWT_EXPIRE}
    )
}


export const User = mongoose.model("User", userSchema)