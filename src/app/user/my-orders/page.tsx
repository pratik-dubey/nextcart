'use client'
// import { IOrder } from '@/models/order.model'
import axios from 'axios'
import { ArrowLeft, Loader2, PackageSearch } from 'lucide-react'
// import { div } from 'motion/react-client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {motion} from "motion/react"
import UserOrderCard from '@/components/UserOrderCard'
import { IUser } from '@/models/user.model'
import { getSocket } from '@/lib/socket'

interface IOrder {
  _id?: string
  userId: string
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
function MyOrders() {
    const router = useRouter()
    const [orders, setOrders] = useState<IOrder[]>() 
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getMyOrders = async() => {
            try {
                const result = await axios.get("/api/user/my-orders")
                setOrders(result.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                // setLoading(false)
            }
        }

        getMyOrders()
    },[])

   // updating assigned delivery of order with orderid which is when accepted by delivery boy
    useEffect(()=>{
      const socket=getSocket()
      socket.on("order-assigned",({orderId,assignedDeliveryBoy})=>{
      setOrders((prev)=>prev?.map((o)=>(
        o._id==orderId?{...o,assignedDeliveryBoy}:o
      )))
      })
      
      return ()=>{socket.off("order-assigned")}
        },[])

    if(loading) {
        return <div className='flex items-center flex-col justify-center min-h-[50vh] text-gray-600'>
            <Loader2 className='animate-spin w-8 h-8'/>
            <h1>Loading your orders ...</h1>
        </div>
    }
  return (
    <div className='bg-linear-to-b from-white to-gray-100 min-h-screen w-full'>
        <div className='max-w-3xl mx-auto px-4 pt-16 pb-10 relative'>
            <div className='fixed top-0 left-0 w-full backdrop-blur-lg bg-white/70 shadow-sm border-b z-50'>
                <div className='max-w-3xl mx-auto flex items-center gap-4 px-4 py-3'>
                <button className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 active:scale-95 transition' onClick={()=>router.push("/")}>
                <ArrowLeft size={24} className="text-green-700"/>
                </button>
                <h1 className="text-xl font-bold text-gray-800">My Orders</h1>
                </div>
            </div>
            {orders?.length==0 ? (
  <div className='pt-20 flex flex-col items-center text-center'>
    <PackageSearch size={70} className="text-green-600 mb-4" />
    <h2 className='text-xl font-semibold text-gray-700'>No Orders Found</h2>
    <p className='text-gray-500 text-sm mt-1'>Start shopping to view your orders here.</p>
  </div>
):<div className='mt-4 space-y-6'>
  {orders?.map((order,index)=>(
    <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    >
      <UserOrderCard order={order}/>
    </motion.div>
  ))}
  </div>}
        </div>
    </div>
  )
}

export default MyOrders