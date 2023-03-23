import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const router=useRouter()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  useEffect(() => {
  if(localStorage.getItem('token')){
    router.push('/')
  }
    
  }, []
  )
  

  const handleChange=(e)=>{
    if(e.target.name=='email'){
      setEmail(e.target.value)
    }
    else if(e.target.name=='password'){
      setPassword(e.target.value)
    }
  }
  
  const handleSubmit=async (e)=>{
    e.preventDefault()
    const data={name,email,password};
    let res= await fetch('http://localhost:3000/api/login',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    let response=await res.json()
    console.log(response)
    
    setEmail('')
    setPassword('')
    if(response.success){
      localStorage.setItem('token',response.token)
      localStorage.setItem('myuser',JSON.stringify(response.myuser))
    toast.success('You have been Logged In successfully',{
      position:"top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(()=>{

      router.push('http://localhost:3000')
    },1000)
  }
  else{
    toast.error('Invalid Credentials',{
      position:"top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  }


  
  return (
    <div>
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
  
  
<div className="flex h-[75vh] justify-center mt-10 py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div>
      <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=red&shade=600" alt="Your Company"/>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Log in to your account</h2>
      <p className="mt-2 text-center text-sm ">
        Or
        <Link href={'/signup'} className="font-medium text-red-600 hover:text-red-500" > Signup
        {/* <a className="font-medium text-red-600 hover:text-red-500"> Signup</a> */}
        </Link>
      </p>
    </div>
    <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="relative my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="Email address"/>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="Password"/>
        </div>
      </div>

      <div className="flex  justify-between">
        <div className="flex ">
          <input id="remember-me" name="remember-me"  />
          <label htmlFor="remember-me" className=" block text-sm text-gray-900"></label>
        </div>
        <Link href={'/forgotpassword'}>
        <div className="text-sm font-medium hover:text-red-500 -my-3 text-red-600">Forgot Password
          {/* <a href="#" className="font-medium text-red-600 hover:text-red-500">Forgot your password?</a> */}
        </div>
        </Link>
      </div>

      <div>
        <button type="submit" className="group relative -my-6 flex w-full justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          
          Log in
        </button>
      </div>
    </form>
  </div>
</div>

    </div>
  )
}

export default Login