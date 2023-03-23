import React, { useState } from 'react'
import mongoose from 'mongoose'
import Order from '@/models/Product'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'

const Orders = () => {
  const router=useRouter()
  const[orders,setOrders]=useState([])
  useEffect(()=>{
    const fetchOrders=async()=>{

      let a =await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({token: localStorage.getItem('token')}),
      })
      let res=await a.json()
      setOrders(res.orders)
    }
    if(!localStorage.getItem('token')){
      router.push('/')
    }
    else{
      fetchOrders()
  }
  },[])
  return (
    <>
    <div className='container min-h-[80vh] mx-auto my-auto'>
        <h2 className='font-bold text-xl text-center my-10'>My Orders</h2>

        <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">Product name</th>
              <th scope="col" className="px-6 py-4">qty</th>
              <th scope="col" className="px-6 py-4">total price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item)=>{

              return <tr key={item._id} className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{item.orderId}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.name} </td>
              <td className="whitespace-nowrap px-6 py-4">{item.amount} </td>
              <td className="whitespace-nowrap px-6 py-4">
                <Link href={'order?id='+item._id}></Link>
              </td>
            </tr>
            })}
            
            
          </tbody>
        </table>
        {orders.length===0 && <div className="flex justify-center items-center my-4">
              <p>No orders to display</p>
              </div>
}

      </div>
    </div>
  </div>
</div>

    </div>
    </>
  )
}

// export async function getServerSideProps(context){
//     if(!mongoose.connections[0].readyState){
//       await mongoose.connect(process.env.MONGO_URI)
//   }
  
//     let orders = await Order.find({ })
    
  
//     return{
//       props:{orders: orders}
//     }
    
      
//     }

export default Orders