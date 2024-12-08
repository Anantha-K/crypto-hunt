import connect from "@/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connect();
    const users = await User.find().sort({ score: -1, timeTaken: 1 });
    if (!users || users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    const leaderboard = users.map((user) => ({
      name: user.name,
      email: user.email,
      score: user.score,
      currentLevel: user.currentLevel,
      finishTime: user.completeTime,
    }));

    return NextResponse.json(
      {
        message: "Leaderboard fetched successfully",
        leaderboard: leaderboard,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};



