import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

import { UserDocument } from "../types/user.interface";


const userSchema = new mongoose.Schema<UserDocument>({
    userName: {
        type: String,
        minlength: [5, "to short username"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        this.password = await bcryptjs.hash(this.password, 12);
        return next();
    } catch (error) {
        return next(error as Error);
    }
});

userSchema.methods.validatePassword  = async function(password:string) {
    return await bcryptjs.compare(password, this.password);
}

const userModel = mongoose.model<UserDocument>("users", userSchema);