import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'

const Signup = () => {
  const router=useRouter()
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
      
    }, [])
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const handleChange=(e)=>{
    if(e.target.name=='name'){
      setName(e.target.value)
    }
    else if(e.target.name=='email'){
      setEmail(e.target.value)
    }
    else if(e.target.name=='password'){
      setPassword(e.target.value)
    }
  }
  
  const handleSubmit=async (e)=>{
    e.preventDefault()
    const data={name,email,password};
    let res= await fetch('http://localhost:3000/api/signup',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    let response=await res.json()
    
    setEmail('')
    setName('')
    setPassword('')
    if(response.success){
    toast.success('Your account has been created',{
      position:"top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  else{
    toast.error('User already exists',{
      position:"top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
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
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up</h2>
      <p className="mt-2 text-center text-sm ">
        Or
        <Link href={'/login'} className="font-medium text-red-600 hover:text-red-500" > Login
        {/* <a className="font-medium text-red-600 hover:text-red-500"> Signup</a> */}
        </Link>
      </p>
    </div>
    <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px rounded-md shadow-sm">
      <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input value={name} onChange={handleChange} id="naem" name="name" type="text" autoComplete="name" required className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="Name"/>
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="relative my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="Email address"/>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="Password"/>
        </div>
      </div>

      
      <div>
        <button type="submit" className="group relative flex w-full justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-red-500 group-hover:text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
          </span>
          Sign up
        </button>
      </div>
    </form>
  </div>
</div>
    </div>
  )
}

export default Signup