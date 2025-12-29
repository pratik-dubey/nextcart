import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectDb from "@/lib/db";
import Grocery from "@/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  // FormData ek universal courier-package format hai jo Web API provide karti hai — Next.js ise banata nahi, sirf req.formData() deke package kholne ka counter deta hai.

  //     🧠 When should you use req.formData()?

  // Use it when you're handling:

  // ✔ File uploads
  // ✔ Image uploads
  // ✔ Video uploads
  // ✔ PDF uploads
  // ✔ Any multipart/form-data request
  // ✔ Anything sent via <form enctype="multipart/form-data">

  // Not for normal JSON.
  try {
    await connectDb();
    const session = await auth();
    if (session?.user?.role != "admin") {
      return NextResponse.json(
        { message: "Admin status required !!!" },
        { status: 400 }
      );
    }

    const formdata = req.formData();
    const name = (await formdata).get("name") as string;
    const category = (await formdata).get("category") as string;
    const unit = (await formdata).get("unit") as string;
    const price = (await formdata).get("price") as string;
    const file = (await formdata).get("image") as Blob | null;

    let imageUrl;
    if (file) {
      imageUrl = await uploadOnCloudinary(file);
    }

    const grocery = await Grocery.create({
      name,
      price,
      category,
      unit,
      image: imageUrl,
    });

    return NextResponse.json(grocery, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Add grocery error ${error}` },
      { status: 500 }
    );
  }
}
