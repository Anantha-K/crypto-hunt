import connect from "@/db";
import Hunt from "@/models/Hunt";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (request) => {
  const leaderboard = await Hunt.find().sort({ score: -1 });
  return NextResponse.json({ leaderboard });
};