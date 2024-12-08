import connect from "@/db";
import Hunt from "@/models/Hunt";
import { NextRequest, NextResponse } from "next/server";

connect(); 



export const POST = async (request) => {
  try {
    const { email, score, level, hints } = await request.json();

    const updatedUser = await Hunt.findOneAndUpdate(
      { email }, 
      { score, level, currentLevelClues: hints }, 
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 }); 
    }

    console.log("Update request initiated with data:", { email, score, level, hints });
    console.log("Update completed. Result:", updatedUser); 
    return NextResponse.json({ message: "User data updated" }, { status: 200 });



  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 }); 
  }
};
