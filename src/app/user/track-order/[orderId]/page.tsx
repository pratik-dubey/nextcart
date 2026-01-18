'use client'
import LiveMap from '@/components/LiveMap'
import { getSocket } from '@/lib/socket'
import { IUser } from '@/models/user.model'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface IOrder {
    _id?: string
    user: string
    items: [
        {
            grocery: string,
            name: string,
            price: string,
            unit: string,
            image: string
            quantity: number
        }
    ]
    ,
    isPaid: boolean
    totalAmount: number,
    paymentMethod: "cod" | "online"
    address: {
        fullName: string,
        mobile: string,
        city: string,
        state: string,
        pincode: string,
        fullAddress: string,
        latitude: number,
        longitude: number
    }
    assignment?: string
    assignedDeliveryBoy?: IUser
    status: "pending" | "out of delivery" | "delivered",
    createdAt?: Date
    updatedAt?: Date
}
interface ILocation {
    latitude: number,
    longitude: number
}
function TrackOrder({ params }: { params: { orderId: string } }) {
    const [order, setOrder] = useState<IOrder>()
    const router = useRouter()
    const [userLocation, setUserLocation] = useState<ILocation>(
        {
            latitude: 0,
            longitude: 0
        }
    )
    const [deliveryBoyLocation, setDeliveryBoyLocation] = useState<ILocation>({
        latitude: 0,
        longitude: 0
    })
    // here the way of getting params is a bit different as compared to backend routes
    const { orderId } = useParams()

    useEffect(():any => {
        const socket = getSocket();
        socket.on("update-deliveryBoy-location", (data) => {
            setDeliveryBoyLocation({
                latitude: data.location.coordinates?.[1] ?? data.location.latitude,
                      longitude: data.location.coordinates?.[0] ?? data.location.longitude,
              
               })
        })
        return ()=>socket.off("update-deliveryBoy-location")
    }, [])
    useEffect(() => {
        try {
            const getOrder = async () => {
                const result = await axios.get(`/api/user/get-order/${orderId}`)
                // console.log(result.data)
                setOrder(result.data)
                setUserLocation({
                    latitude: result.data.address.latitude,
                    longitude: result.data.address.longitude,
                })
                setDeliveryBoyLocation({
                    latitude: result.data.assignedDeliveryBoy.location.coordinates[1],
                    longitude: result.data.assignedDeliveryBoy.location.coordinates[0]
                })
            }
            getOrder()
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div className='w-full min-h-screen bg-linear-to-b from-green-50 to-white'>
            <div className='max-w-2xl mx-auto pb-24'>
                <div className='sticky top-0 bg-white/80 backdrop-blur-xl p-4 border-b shadow flex gap-3 items-center z-999'>
                    <button className='p-2 bg-green-100 rounded-full' onClick={() => router.back()}><ArrowLeft className="text-green-700" size={20} /></button>
                    <div>
                        <h2 className='text-xl font-bold'>Track Order</h2>
                        <p className='text-sm text-gray-600'>order#{order?._id?.toString().slice(-6)} <span className='text-green-700 font-semibold'>{order?.status}</span></p>
                    </div>


                </div>

                <div className='px-4 mt-6 space-y-4'>
               <div className='rounded-3xl overflow-hidden border shadow'>
                   <LiveMap userLocation={userLocation} deliveryBoyLocation={deliveryBoyLocation}/>
               </div>
               </div>
            </div>
        </div>
    )
}

export default TrackOrder