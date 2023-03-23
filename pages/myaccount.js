import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Myaccount = () => {

  const [name,setName] = useState('')
  const [address,setAddress] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [cpassword,setCpassword] = useState('')
  const [npassword,setNpassword] = useState('')
  const [phone,setPhone] = useState('')
  const [pincode,setPincode] = useState('')
  const [city,setCity] = useState('')
  const [state,setState] = useState('')
  const [disabled,setDisabled] = useState(true)
  const [user,setUser] = useState({value: null})

    let router=useRouter()
    useEffect(() => {
      const myuser=JSON.parse(localStorage.getItem('myuser'))
      // console.log(user)
      
      if(!localStorage.getItem('token')){
        router.push('/')
      }
      if( myuser && myuser.token){
        // console.log("hello")
        setUser(myuser)
        setEmail(myuser.email)
        fetchData(myuser.token)
      }
      // let token=localStorage.getItem('token')
      // console.log(token)
          
        }, [])

      const fetchData=async(token)=>{
        let data={token: token}
        // let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`,{
          let a = await fetch(`http://localhost:3000/api/getuser`,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
          let res=await a.json()
          setName(res.name)
          setAddress(res.address)
          setPincode(res.pincode)
          setPhone(res.phone)

          // console.log("hello")
      }
      const handleUserSubmit=async()=>{
        let data={token: user.token,address,name,phone,pincode}
        // let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`,{
          let a = await fetch(`http://localhost:3000/api/updateuser`,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
          let res=await a.json()
          // console.log("hello")
          if(res.success){
          toast.success('Updated Successfully',{
            position:"bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
        else{
          toast.error('Some error occured',{
            position:"bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      }
      const handlePasswordSubmit=async()=>{
        let res;
        if(npassword==cpassword){
        let data={token: user.token,password,cpassword, npassword}
        // let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`,{
          let a = await fetch(`http://localhost:3000/api/updatepassword`,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
          res=await a.json()
        }
        else{
          res={success: false}
        }
          // console.log("hello")
          if(res.success){
            toast.success('Updated Password Successfully',{
              position:"bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
          else{
            toast.error('Some error occured',{
              position:"bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
          setPassword('')
          setCpassword('')
          setNpassword('')
      }
        
  const handleChange=async(e)=>{
    
    if(e.target.name=='name'){
      setName(e.target.value)
    }
    else if(e.target.name=='address'){
      setAddress(e.target.value)
    }
    else if(e.target.name=='phone'){
      setPhone(e.target.value)
    }
    else if(e.target.name=='password'){
      setPassword(e.target.value)
    }
    else if(e.target.name=='cpassword'){
      setCpassword(e.target.value)
    }
    else if(e.target.name=='npassword'){
      setNpassword(e.target.value)
    }
    else if(e.target.name=='pincode'){
      setPincode(e.target.value)
      // if(e.target.value.length==6){
      //   let pins=await fetch(`http://localhost:3000/api/pincode`)
      //   let pinJson=await pins.json()
      //   console.log(pinJson)
      //   if(Object.keys(pinJson).includes(e.target.value)){
      //     setState(pinJson[e.target.value][1])
      //     setCity(pinJson[e.target.value][0])
      //   }
      //   else{
      //     setState('')
      //     setCity('')
      //   }
      // }
      // else{
      //   setState('')
      //     setCity('')
      // }
    }
// setTimeout(()=>{

  
// },100);

  }
  return (
    <div className='container mx-auto my-9'>
      <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      <h1 className="text-3xl text-center font-bold">Update Your Account</h1>
      <h2 className="font-semibold text-xl mb-6">1. Delivery Details</h2>
      <div className="flex flex-wrap -m-2">
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name" className=" text-sm text-gray-600">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3  transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="email" className=" text-sm text-gray-600">Email</label>
            <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3  transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="address" className=" text-sm text-gray-600">Address</label>
            <textarea onChange={handleChange} value={address} id="address" rows="2" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>

        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="phone" className=" text-sm text-gray-600">Phone</label>
            <input onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3  transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="city" className=" text-sm text-gray-600">City</label>
            <input onChange={handleChange} value={city} type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3  transition-colors duration-200 ease-in-out"  />
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="state" className=" text-sm text-gray-600">State</label>
            <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3  transition-colors duration-200 ease-in-out"  />
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="pincode" className=" text-sm text-gray-600">PIN code</label>
            <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3  transition-colors duration-200 ease-in-out"/>
          </div>
        </div>

        <button onClick={handleUserSubmit} className="disabled:bg-pink-300 flex mx-2 my-3 text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm"> Submit </button>
   
      </div>
      <h2 className="font-semibold text-xl mb-6 mt-4">2. Change Password </h2>
      <div className="flex flex-wrap -m-2">
       
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="password" className=" text-sm text-gray-600">Password</label>
            <input onChange={handleChange} value={password} type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3  transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="npassword" className=" text-sm text-gray-600">New Password</label>
            <input onChange={handleChange} value={cpassword} type="password" id="npassword" name="npassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3  transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="cpassword" className=" text-sm text-gray-600">Confirm New Password</label>
            <input onChange={handleChange} value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3  transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <button onClick={handlePasswordSubmit} className="disabled:bg-pink-300 flex mx-2 my-3 text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm"> Submit </button>
   
        
        </div>


    </div>
  )
}

export default Myaccount