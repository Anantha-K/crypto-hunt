import connect from "@/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      hintsRemaining: user.hintsRemaining,
      currentHintIndex: user.currentHintIndex
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hint data:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}