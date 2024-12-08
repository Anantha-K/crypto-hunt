import connect from "@/db";
import ContestSettings from "@/models/contest";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

connect();

export const GET = async (request) => {
  try {
    await connect();
    const contestSettings = await ContestSettings.findOne();
    
    if (!contestSettings) {
      return NextResponse.json({ isActive: false }, { status: 404 });
    }

    const currentTime = new Date();
    const isActive = contestSettings.isActive &&
                    currentTime >= contestSettings.startTime &&
                    currentTime <= contestSettings.endTime;

    return NextResponse.json({ isActive }, { status: 200 });
  } catch (error) {
    console.error("Error checking contest status:", error);
    return NextResponse.json({ isActive: false }, { status: 500 });
  }
};
