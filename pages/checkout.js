import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRef } from 'react'
import {AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle, AiOutlineShoppingCart} from 'react-icons/ai'
import {BsFillBagCheckFill} from 'react-icons/bs'
import Head from 'next/head'
import Script from 'next/script'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const Checkout = ({cart,subTotal,addToCart,removeFromCart,clearCart}) => {

  const [name,setName] = useState('')
  const [address,setAddress] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [pincode,setPincode] = useState('')
  const [city,setCity] = useState('')
  const [state,setState] = useState('')
  const [disabled,setDisabled] = useState(true)
  const [user,setUser] = useState({value: null})

  useEffect(()=>{
    const myuser=JSON.parse(localStorage.getItem('myuser'))
    if( myuser && myuser.token){
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    }
// user is still not working correctly, the jwt sign is not working either
  },[])
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

  useEffect(() => {
    if(name.length>3 && email.length>3 && address.length>3 && phone.length===10 && pincode.length>5){
      setDisabled(false)
      
    }
    else{
      setDisabled(true)
    }
  }, [name,email,phone,pincode,address])


  const handleChange=async(e)=>{
    
    if(e.target.name=='name'){
      setName(e.target.value)
    }
    else if(e.target.name=='email'){
      setEmail(e.target.value)
    }
    else if(e.target.name=='address'){
      setAddress(e.target.value)
    }
    else if(e.target.name=='phone'){
      setPhone(e.target.value)
      
      
    }
    else if(e.target.name=='pincode'){
      setPincode(e.target.value)
      if(e.target.value.length==6){
        let pins=await fetch(`http://localhost:3000/api/pincode`)
        let pinJson=await pins.json()
        console.log(pinJson)
        if(Object.keys(pinJson).includes(e.target.value)){
          setState(pinJson[e.target.value][1])
          setCity(pinJson[e.target.value][0])
        }
        else{
          setState('')
          setCity('')
          toast.error('This pincode is not serviceable',{
            position:"bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          setPincode('')
        }
      }
      else{
        setState('')
          setCity('')
      }
    }
// setTimeout(()=>{

  
// },100);

  }
  

  const initiatePayment=async()=>{

   let oid=Math.floor( Math.random() * Date.now());
    const data={cart,subTotal,oid, email: email, name, address , pincode, phone};
   let a = await fetch(`${NEXT_PUBLIC_HOST}/api/pretransaction`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
   })
   let txnRes= await a.json()
   if(txnRes.success){
   let txnToken=txnRes.txnToken
  //  console.log(txnToken)

      var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
      "orderId": oid, /* update order id */
      "token": txnToken, /* update token value */
      "tokenType": "TXN_TOKEN",
      "amount": subTotal /* update amount */
      },
      "handler": {
      "notifyMerchant": function(eventName,data){
      console.log("notifyMerchant handler function called");
      console.log("eventName => ",eventName);
      console.log("data => ",data);
      }
      }
      };
  
      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error){
      console.log("error => ",error);
      });
    }
    else{
      console.log(txnRes.error)
      if(txnRes.cartClear){
        clearCart()
      }
      clearCart()
      toast.error('This is not allowed',{
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
  return (
    <>
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
   <div className="container m-auto">
<Head>
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
</Head>

<Script type="application/javascript" crossOrigin='anonymours' src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} 
 />
   
  <div className="container px-5 my-10 py-10 ">
    <div className="flex flex-col text-center w-full mb-12">
      <h2 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Checkout</h2>
        </div>
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
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
       
      </div>
      

    <h2 className="font-semibold text-xl my-10">2. Review Cart Items</h2>

    <div className=" sideCart  bg-red-100 p-6 m-2 ">
      <span  className="absolute top-5 right-2 cursor-pointer text-2xl text-red-500"> <AiFillCloseCircle/> </span>
   
    <ol className='list-decimal text-black  font-semibold mt-10'>
      {
        Object.keys(cart).length==0 && <div className="my-3 text-center font-semibold">Your cart is empty!</div>
      }

      {Object.keys(cart).map((k)=>{return <li key={k} className='ml-3'>
        <div className="item flex my-5">
        <div className=' font-semibold text-black' >{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
        <div className="flex font-semibold items-center justify-center w-1/3 text-lg"> <AiFillMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name, cart[k].size,cart[k].variant)}} className='cursor-pointer text-red-500' /> <span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name, cart[k].size,cart[k].variant)}} className='cursor-pointer text-red-500' /> </div>
        </div>
      </li>
})}

      
    </ol>
  <span className="total font-bold">Subtotal: ₹{subTotal}</span>
    </div>
  <Link href={'/sorry'}>
    <button disabled={disabled}  className="disabled:bg-pink-300 flex mx-4 mr-2 text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm"> <BsFillBagCheckFill className='m-1' /> Pay ₹{subTotal}</button>
    </Link>




    </div>
  </div>

  </div>

    </>
  )
}

export default Checkout