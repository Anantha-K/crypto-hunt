import connect from "@/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// API Route (/api/auth/logoutVio)
export async function POST(request) {
    try {
      await connect();
  
      // Get token from authorization header
      const authHeader = request.headers.get("authorization");
      if (!authHeader) {
        return NextResponse.json({ error: "No authorization header" }, { status: 401 });
      }
  
      const token = authHeader.split(" ")[1];
      if (!token) {
        return NextResponse.json({ error: "No token provided" }, { status: 401 });
      }
  
      // Verify token and get email
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded token:", decoded);
      } catch (error) {
        console.error("Token verification failed:", error);
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
  
      const userEmail = decoded.email;
      if (!userEmail) {
        console.error("No email in token");
        return NextResponse.json({ error: "Invalid token format" }, { status: 401 });
      }
  
    //   console.log("User email from token:", userEmail);
  
      // Find user by email and update in a single operation
      const updatedUser = await User.findOneAndUpdate(
        { email: userEmail },
        { 
          $inc: { logoutCount: 1 } 
        },
        { new: true }
      );
  
      if (!updatedUser) {
        console.error("User not found for email:", userEmail);
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
    //   console.log("Updated user:", updatedUser);
  
      // Check if user has exceeded logout limit
      if (updatedUser.logoutCount > 4) {
        updatedUser.violated = true;
        updatedUser.gameOver = true;
        await updatedUser.save();
  
        return NextResponse.json({
          message: "Account violated due to excessive logouts",
          violated: true,
          logoutCount: updatedUser.logoutCount
        }, { status: 403 });
      }
  
      return NextResponse.json({
        message: "Logout successful",
        logoutCount: updatedUser.logoutCount,
        violated: updatedUser.violated
      });
  
    } catch (error) {
      console.error("Logout error:", error);
      return NextResponse.json(
        { error: "Internal server error", details: error.message },
        { status: 500 }
      );
    }
  }