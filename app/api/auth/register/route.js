import connect from "@/db";
import Hunt from "@/models/Hunt";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import validator from 'validator';
import bcrypt from 'bcryptjs';

connect();

export const POST = async (request, response) => {
    const { name, email, password } = await request.json();
    const score = 0;
    const level = 0;
    const hint = 3;

    if (!validator.isEmail(email)) {
        return NextResponse.json(
            { message: "Invalid email format" },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "Email already exists" },
                { status: 400 }
            );
        }

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const hunt = new Hunt({ email, name, score, level, hint });
        await hunt.save();

        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};