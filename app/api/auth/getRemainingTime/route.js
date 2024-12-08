import connect from "@/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

connect();

export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

   

    try {
        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
          }
      
          const user = await User.findOne({ email });
      
          if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
          }
        

        const currentTime = Date.now();
        const startTime = user.startTime;
        const expirationTime = startTime.getTime() + 2 * 60 * 60 *1000 ; 
        const remainingTime = Math.max(0, expirationTime - currentTime);

        return NextResponse.json({ remainingTime: remainingTime/1000 }); 
    } catch (error) {
        console.error("Error fetching remaining time:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
