import connect from "@/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    console.log("User:", user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.hintsRemaining === undefined) {
      console.log("Hints remaining is undefined.");
    }

    const curr = Math.abs(user.hintsRemaining - 3);
    console.log("Current Hint Index:", curr);

    return NextResponse.json({ currentHintIndex: curr }, { status: 200 });
  } catch (error) {
    console.error("Error fetching current hint index:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}