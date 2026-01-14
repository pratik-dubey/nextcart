// import { auth } from "@/auth";
// import connectDb from "@/lib/db";
// import DeliveryAssignment from "@/models/deliveryAssigment.model";

// import { NextResponse } from "next/server";

// export async function GET() {
//     try {
//        await connectDb()
//        const session=await auth()
//         const assignments=await DeliveryAssignment.find({
//           broadcastedTo:session?.user?.id,
//           status: { $in: ["broadcasted", "assigned"] }
//         }).populate("order")
//         return NextResponse.json(
//             assignments,{status:200}
//         )
//     } catch (error) {
//         return NextResponse.json(
//            {message:`get assignments error ${error}`},{status:500}
//         )
//     }
// }


import { auth } from "@/auth";
import connectDb from "@/lib/db";
import DeliveryAssignment from "@/models/deliveryAssigment.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb()

    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = new mongoose.Types.ObjectId(session.user.id)

    const assignments = await DeliveryAssignment.find({
      broadcastedTo: userId,
      status:"broadcasted"
    }).populate("order")
    console.log("request made !!!")
    return NextResponse.json(assignments, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "get assignments error", error },
      { status: 500 }
    )
  }
}
