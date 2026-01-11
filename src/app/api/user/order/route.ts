import connectDb from "@/lib/db";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const {userId, address, paymentMethod, items, totalAmount} = await req.json()
        // if(!address || !userId || !paymentMethod || !items || totalAmount === undefined || totalAmount === null) {
        //     return NextResponse.json({
        //          message: "please send all credentials"  
        //     },{status: 400})
        // }

        const user = await User.findById(userId);
        if(!user) {
            return NextResponse.json({ message: "user not found" },
                { status: 400 })
        }

        console.log(user)
        const newOrder = await Order.create({
            userId,
            items,
            paymentMethod,
            totalAmount,
            address
        })

        return NextResponse.json(
            newOrder,
            { status: 201 }
        )
    } catch (error) {
         return NextResponse.json(
                {message:`place order error ${error}`},
                {status:500}
            )
    }
}