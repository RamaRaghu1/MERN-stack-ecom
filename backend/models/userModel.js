import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            required:true,
            default:false,
        }
    },{timestamps:true})



userSchema.methods.matchPassword= async function(enteredPassword){
return await bcrypt.compare(enteredPassword, this.password)
}

// if the pasword field isn't modified it will directly call next() ie.middleware 
userSchema.prev("save", async function(next){
    if(!this.isModified("password")) return next();

// or else if it is modified it will hash the password before saving the password in db
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.generateAccessToken=async function(){
    return jwt.sign({id:this._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}

userSchema.methods.generateRefreshToken= function(){
    return jwt.sign({id:this._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}

    const User=mongoose.model("User",userSchema);
    export default User;