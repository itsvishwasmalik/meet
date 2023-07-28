import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false, required: false },
    isAdmin: { type: Boolean, default: false, required: false },

    // For password reset
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
});

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;
