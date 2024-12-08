import connect from "@/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const { email } = await request.json();
    const completeTime = new Date();

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { completeTime: completeTime },
      { new: true, runValidators: true }
    );

    if (updatedUser.startTime) {
        const startTime = updatedUser.startTime.getTime();
        const completeTime = updatedUser.completeTime.getTime();
        const timeTaken = completeTime - startTime;
        updatedUser.timeTaken = timeTaken;
        await updatedUser.save();
      }
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("Update completed. Result:", updatedUser);
    return NextResponse.json({ message: "User data updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
