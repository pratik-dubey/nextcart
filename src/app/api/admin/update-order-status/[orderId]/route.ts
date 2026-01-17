import connectDb from "@/lib/db";
import emitEventHandler from "@/lib/emitEventHandler";
import DeliveryAssignment from "@/models/deliveryAssigment.model";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { orderId: string } }) {
    try {
        await connectDb()
        const { status } = await req.json()
        const { orderId } = await params

        const order = await Order.findById(orderId).populate("userId")

        if (!order) {
            return NextResponse.json(
                { message: "order not found" },
                { status: 400 }
            )
        }
        order.status = status
        let deliveryBoysPayload:any = []

        if (!order.assignment && order.status === "out of delivery") {
            const { latitude, longitude } = order.address
            const nearByDeliveryBoys = await User.find({
                role: "deliveryBoy",
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [Number(longitude), Number(latitude)]
                        }
                    }
                }
            })

            const nearByIds = nearByDeliveryBoys.map((b) => b._id)
            const busyIds = await DeliveryAssignment.find({
                assignedTo: { $in: nearByIds },
                status: { $nin: ["broadcasted", "completed"] }
            }).distinct("assignedTo")
            // .distinct("assignedTo") is used only to get assignedTo field from DeliverAssignment schema

            const busyIdSet = new Set(busyIds.map(b => String(b)))
            const availableDeliveryBoys = nearByDeliveryBoys.filter(b => !busyIdSet.has(b._id))

            const candidates = availableDeliveryBoys.map(b => b._id)

            if (candidates.length == 0) {
                await emitEventHandler("order-status-update", { orderId: order._id, status: order.status })
                await order.save()

                return NextResponse.json(
                    { message: "No available Delivery boys nearby" },
                    { status: 200 }
                )
            }

            const deliveryAssignment=await DeliveryAssignment.create({
                order:order._id,
                broadcastedTo:candidates,
                status:"broadcasted"
             })
             await deliveryAssignment.populate("order")
             for(const boyId of candidates){
                const boy=await User.findById(boyId)
                if(boy.socketId){
                    await emitEventHandler("new-assignment",deliveryAssignment,boy.socketId)
                }
             }
             order.assignment=deliveryAssignment._id

             // deliveryBoysPayload is being sent to admin so that he can see whom are being broadcasted 
             deliveryBoysPayload=availableDeliveryBoys.map(b=>({
                 id:b._id,
                 name:b.name,
                 mobile:b.mobile,
                 latitude:b.location.coordinates[1],
                 longitude:b.location.coordinates[0]
             }))
             await deliveryAssignment.populate("order")
        }

        await emitEventHandler("order-status-update",{orderId:order._id,status:order.status})
        await order.save()
        await order.populate("userId")
        return NextResponse.json({
            assignment:order.assignment?._id,
            availableBoys:deliveryBoysPayload
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            message:`update status error ${error}`
         },{status:500})
    }
}