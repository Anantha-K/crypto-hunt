import connect from "@/db";
import ContestSettings from "@/models/contest";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async () => {
  try {
    const now = new Date();
    const contestSettings = await ContestSettings.findOne();
    
    if (!contestSettings) {
      return NextResponse.json({ message: "Contest settings not found" }, { status: 404 });
    }
    
    const { startTime, endTime, isActive: dbIsActive } = contestSettings;
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    const isActive = now >= start && now <= end;
    
    if (dbIsActive !== isActive) {
      await ContestSettings.findOneAndUpdate({}, { isActive });
    }
    
    let contestState;
    if (now < start) {
      contestState = "not_started";
    } else if (isActive) {
      contestState = "active";
    } else {
      contestState = "ended";
    }
    
    return NextResponse.json({ isActive, contestState }, { status: 200 });
  } catch (error) {
    console.error("Error checking contest status:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};