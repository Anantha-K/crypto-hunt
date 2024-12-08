import connect from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export const POST = async (request) => {
    const { email, password } = await request.json();

    try {
        const user = await User.findOne({ email });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                if(user.firstLogin){
                    user.firstLogin=false;
                    user.startTime=Date.now();
                    await user.save()
;                    
                }

                const currentTime = Date.now();
                const timeSinceFirstLogin = currentTime - user.firstLoginTime;
                const timeLimit = 2 * 3600 * 1000; 
                const remainingTime = Math.max(timeLimit - timeSinceFirstLogin, 0);

               
                const token = jwt.sign(
                    { success: true, email: user.email, remainingTime },
                    process.env.JWT_SECRET,
                    { expiresIn: "2h" }
                );

                const response = NextResponse.json({
                    token: token,
                    message: "Login Successful",
                    success: true,
                    remainingTime,  
                });
                response.cookies.set('token', token, {
                    httpOnly: true,
                });
                return response;

            } else {
                return NextResponse.json({ message: "Incorrect password" }, { status: 400 });
            }
        } else {
            return NextResponse.json({ message: "No user found" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};