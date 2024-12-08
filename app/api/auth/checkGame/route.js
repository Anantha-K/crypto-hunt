import { NextRequest, NextResponse } from "next/server";

const { default: connect } = require("@/db");
const { default: User } = require("@/models/User");

connect();
export const GET = async (NextRequest) => {
    try {
  
      const email = await NextRequest.nextUrl.searchParams.get("email");
  
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ message: "No user Found" }, { status: 404 });
      }
      const gameOver = user.gameOver;
      console.log(gameOver);
      if(gameOver){
          console.log("Success");
          return NextResponse.json({ message: "Over"}, { status: 200 });

      }
      else{
        return NextResponse.json({ message: "Level"}, { status: 200 });

      }

    } catch (e) {
      console.error("Error in API route:", e);
      return NextResponse.json({ message: "Server Error", error: e.message }, { status: 500 });
    }
  };