'use client'
import { getSocket } from '@/lib/socket'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function DeliveryBoyDashboard() {
    const [assignments, setAssignments] = useState<any[]>([])

    const fetchAssignments = async () => {
      try {
        const result = await axios.get("/api/delivery/get-assignments")
        console.log(result.data)
        setAssignments(result.data)
      } catch (error) {
        console.log(error)
      }
    }
      
      useEffect(():any => {
         const socket = getSocket()
         socket.on("new-assignment", (deliveryAssignment) => {
            setAssignments((prev) => [...prev, deliveryAssignment])
         })

         return () => socket.off("new-assignment")
      }, [])

      const handleAccept = async(id:string) => {
        try {
          const result = await axios.get(`/api/delivery/assignment/${id}/accept-assignment`)
          console.log(result.data)
        } catch (error) {
        console.log(error)
        }
      }

      const fetchCurrentOrder = async () => {
        try {
          const result = await axios.get("/api/delivery/current-order")
          console.log(result.data)
          // if (result.data.active) {
          //   setActiveOrder(result.data.assignment)
          //   setUserLocation({
          //     latitude: result.data.assignment.order.address.latitude,
          //     longitude: result.data.assignment.order.address.longitude
          //   })
          // }
    
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(() => {
        fetchCurrentOrder()
        fetchAssignments()
      }, [])
  return (
<div className='w-full min-h-screen bg-gray-50 p-4'>
      <div className="max-w-3xl mx-auto">
        <h2 className='text-2xl font-bold mt-[120px] mb-[30px]'>Delivery Assigments</h2>

        {assignments.map((a,index) => (
          <div key={index} className='p-5 bg-white rounded-xl shadow mb-4  border'>
            <p ><b>Order Id </b> #{a?.order._id.slice(-6)}</p>
            <p className='text-gray-600'>{a.order.address.fullAddress}</p>

            <div className='flex gap-3 mt-4'>
              <button className='flex-1 bg-green-600 text-white py-2 rounded-lg' onClick={() => handleAccept(a._id)}
              >Accept</button>
              <button className='flex-1 bg-red-600 text-white py-2 rounded-lg'>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeliveryBoyDashboard