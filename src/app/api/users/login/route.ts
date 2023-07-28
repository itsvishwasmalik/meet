import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        console.log(email, password);

        // Login API
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }
        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        // Create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
            expiresIn: "7d",
        });
        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { error: error.message },
            { status: error.statusCode }
        );
    }
}
