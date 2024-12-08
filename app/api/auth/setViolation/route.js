import connect from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async ( NextRequest) => {
  try {
    const body = await NextRequest.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.violated = true;
    user.gameOver = true;
    await user.save();

    return NextResponse.json({ message: "Violation set successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error setting violation:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};