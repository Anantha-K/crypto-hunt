import connect from "@/db";
import Hunt from "@/models/Hunt";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (NextRequest) => {
    const email = await NextRequest.nextUrl.searchParams.get("email");
    console.log(NextRequest.nextUrl.searchParams.get("email"));
  const UserDet = await Hunt.findOne({ email });
  console.log(UserDet)
  return NextResponse.json({ UserDet });
};