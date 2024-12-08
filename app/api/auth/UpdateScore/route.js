import connect from "@/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const { email, score, currentLevel, hintsRemaining, currentHintIndex } = await request.json();
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { score, currentLevel, hintsRemaining, currentHintIndex },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("Update completed. Result:", updatedUser);
    return NextResponse.json({ message: "User data updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}