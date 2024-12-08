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

    if (!user) {
      return NextResponse.json({ message: "No user" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Incorrect password" }, { status: 400 });
    }

    let firstLogin = false;
    if (user.firstLogin) {
      user.firstLogin = false;
      user.startTime = new Date();
      user.firstLoginTime = new Date();
      await user.save();
      firstLogin = true;
    }

    const currentTime = new Date();
    const timeSinceFirstLogin = firstLogin ? 0 : currentTime - user.firstLoginTime;
    const timeLimit = 2 * 3600 * 1000; // 2 hours in milliseconds
    const remainingTime = Math.max(timeLimit - timeSinceFirstLogin, 0);

    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        remainingTime,
        firstLogin
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const response = NextResponse.json({
      token: token,
      message: "Login Successful",
      success: true,
      remainingTime,
      firstLogin
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 
    });

    return response;

  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ 
      message: "Internal Server Error", 
      error: error.message 
    }, { status: 500 });
  }
};