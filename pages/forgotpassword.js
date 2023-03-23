import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Forgotpassword = () => {
  const router=useRouter()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [cpassword,setCpassword]=useState('')
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
      
    }, [])




const sendResetEmail=async()=>{

  let data={
    email,
    sendMail: true
  }
  let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(data)
  })

  let res=await a.json()
  if(res.success){
    console.log("Password reset instructions have been sent to your email")
  }
  else{
    console.log('error occured')
  }
}

const handleChange=async(e)=>{

  if(e.target.name=='password'){
    setPassword(e.target.value)
  }
  else if(e.target.name=='cpassword'){
    setCpassword(e.target.value)
  }
  else if(e.target.name=='email'){
    setEmail(e.target.password)
  }

}

const resetPassword=async()=>{
  if(password==cpassword){
  let data={
    email,
    sendMail: false
  }

  let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(data)
  })

  let res=await a.json()
  if(res.success){
    console.log("Password reset instructions have been sent to your email")
  }
  else{
    console.log('error occured')
  }
}
else{

}
}

  return (
    <div >
        <div className="flex h-[75vh] justify-center mt-10 py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md ">
    <div>
      <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=red&shade=600" alt="Your Company"/>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Change Password</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or
        <Link href={'/login'} legacyBehavior>
        <a href="#" className="font-medium text-red-600 hover:text-red-500"> Log In</a>
        </Link>
      </p>
    </div>
    {router.query.token && <form className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px rounded-md shadow-sm">
        <div className='my-4' >
          <label htmlFor="password" className="sr-only">New password</label>
          <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="password" required className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="Enter your password"/>
        </div>
        <div>
          <label htmlFor="cpassword" className="sr-only">Confirm New password</label>
          <input value={cpassword} onChange={handleChange} id="cpassword" name="cpassword" type="password" autoComplete="cpassword" required className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="Confirm your password"/>
        </div>
        
        
      </div>

      

      <div>
        <button disabled={password!==cpassword} onClick={resetPassword} type="submit" className="disabled:bg-red-300 group relative flex w-full justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-red-500 group-hover:text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
          </span>
          Change Password
        </button>
      </div>
    {password!==cpassword &&
      <div className="text-red-700 mx-3 ">
        <span>Both the passwords must be same</span>
      </div>
      }
    </form>}

    {!router.query.token && <form className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px rounded-md shadow-sm">
        
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input value={email} onChange={handleChange} id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="Email address"/>
        </div>
        
      </div>

      

      <div>
        <button onClick={sendResetEmail} type="submit" className="group relative flex w-full justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-red-500 group-hover:text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
          </span>
          Send e-mail
        </button>
      </div>
    </form>}
      <div className="container max-height-200">

      </div>

  </div>
</div>

    </div>
  )
}

export default Forgotpassword