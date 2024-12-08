import { NextRequest, NextResponse } from "next/server";

const { default: connect } = require("@/db");
const { default: Level } = require("@/models/Level");
const { default: User } = require("@/models/User");

connect();
export const POST = async (NextRequest) => {
    try {
  
      const email = await NextRequest.nextUrl.searchParams.get("email");
  
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ message: "No user Found" }, { status: 404 });
      }
  
      user.gameOver='true';
      await user.save();
  
      return NextResponse.json({ message: "Success"}, { status: 200 });

    } catch (e) {
      console.error("Error in API route:", e);
      return NextResponse.json({ message: "Server Error", error: e.message }, { status: 500 });
    }
  };