import connect from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (NextRequest) => {
  try {
    const email = await NextRequest.nextUrl.searchParams.get("email");

 
    // const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ violated: user.violated }, { status: 200 });
  } catch (error) {
    console.error("Error checking violation:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};