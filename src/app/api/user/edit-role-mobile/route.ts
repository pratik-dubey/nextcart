import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

interface EditRoleMobileBody {
  role?: string;
  mobile?: string;
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    // const body = (await req.json()) as EditRoleMobileBody;
    const { role, mobile } = (await req.json()) as EditRoleMobileBody;
    const session = await auth();
    const user = await User.findOneAndUpdate(
      { email: session?.user?.email },
      {
        role,
        mobile,
      },
      { returnDocument: "after" } // so that updated user is returned
    );
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `edit role and mobile error :- ${error}` },
      { status: 500 }
    );
  }
}
