import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { name, email, password } = await req.json();
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !password || !name?.trim()) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existUser = await User.findOne({ email: normalizedEmail });
    if (existUser) {
      return NextResponse.json(
        { message: "email already exist!" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password length must be greater than 5" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      name: name.trim(),
      password: hashedPassword,
      email: normalizedEmail,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error occured ${error}` },
      { status: 500 }
    );
  }
}
