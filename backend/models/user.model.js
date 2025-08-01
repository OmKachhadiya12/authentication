import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 6 characters"],
    }
},{timestamps: true});

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password,10);
    next();

});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password);
};

const User = mongoose.model("User",userSchema);

export {User};