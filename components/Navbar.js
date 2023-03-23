import React from 'react'
import Link from 'next/link'
import { useRef } from 'react'
import {AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle, AiOutlineShoppingCart} from 'react-icons/ai'
import {BsFillBagCheckFill} from 'react-icons/bs'
import {MdAccountCircle} from 'react-icons/md'
import { useState } from 'react'

const Navbar = ({logout,user,cart,subTotal, addToCart, removeFromCart, clearCart}) => {

  const [dropdown,setDropdown] = useState(false)
  const toggleDropdown=()=>{
    setDropdown(!dropdown)
  }
  // useEffect(() => {
    
  // }, [])
  

  const toggleCart=()=>{
    if(ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-full');
      ref.current.classList.add('translate-x-0');

    }
    else if(!ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-0');
      ref.current.classList.add('translate-x-full');
    }

  }
  const ref= useRef()


  return (
    <div className='shadow-md sticky top-0 z-10 '>
      <header className="text-gray-400 bg-gray-900 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link href={'/'} legacyBehavior>

    <a className="flex title-font font-medium items-center text-white md:mb-0">
      <img src="logo-modified.ico" alt="logo" className="w-[60px] " />
   
      
      <span className="ml-3 text-xl">CodeShop</span>
    </a>
    </Link>
    <nav className="cursor-pointer md:ml-auto md:mr-auto flex flex-wrap items-center font-bold text-base justify-center">
      <Link href={'/tshirts'} className="mr-5 hover:text-white">Tshirts</Link>
      <Link href={'/hoodies'} className="mr-5 hover:text-white">Hoodies</Link>
      <Link href={'/details'} className="mr-5 hover:text-white">More </Link>
      <Link href={'/'} className="mr-5 hover:text-white">About </Link>
    </nav>
   <div className="cart absolute right-0 mx-4 md:mx-8 top-8 flex">
    <button onClick={toggleCart}> 
    <AiOutlineShoppingCart className='text-2xl mx-4 md:text-3xl'/>  
    </button>
    <a onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>

    {dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute -right-7 bg-red-300 text-black top-8 rounded-md px-4 py-3 w-[123px]">
      <ul>
        <Link legacyBehavior href={'/myaccount'}><a> <li className='py-1 text-sm hover:cursor-pointer hover:text-white '>My Account</li></a></Link>
        <Link legacyBehavior href={'/orders'}><a> <li className='py-1 text-sm hover:cursor-pointer hover:text-white '>Orders</li></a></Link>
        <a onClick={logout}> <li className='py-1 text-sm hover:cursor-pointer hover:text-white '>Logout</li></a>
      </ul>
    </div>}
    </a>
    {user.value && <MdAccountCircle onMouseOver={toggleDropdown} onMouseLeave={toggleDropdown} className='text-2xl md:text-3xl'/>}
    {!user.value && <Link href={'/login'} legacyBehavior>
    <button className='bg-red-500 px-2 py-1 mt-0.5 rounded-md text-sm text-white'>Login
    </button>
    </Link>}
   </div>

    <div ref={ref}  className={` w-72  h-[100vh] sideCart overflow-y-scroll absolute top-0 right-0 bg-red-100 py-10 px-8 transform transition-transform ${Object.keys(cart).length!==0? 'translate-x-0':'translate-x-full' } `}>
      <h2 className="font-bold text-xl text-black text-center">Shopping Cart</h2>
      <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-red-500"> <AiFillCloseCircle/> </span>
   
    <ol className='list-decimal text-black  font-semibold mt-10'>
      {
        Object.keys(cart).length==0 && <div className="my-3 text-center font-semibold">Your cart is empty!</div>
      }

      {Object.keys(cart).map((k)=>{return <li key={k} className='ml-3'>
        <div className="item flex my-5">
        <div className=' w-2/3 font-semibold text-black' >{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
        <div className="flex font-semibold items-center justify-center w-1/3 text-lg"> <AiFillMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name, cart[k].size,cart[k].variant)}} className='cursor-pointer text-red-500' /> <span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name, cart[k].size,cart[k].variant)}} className='cursor-pointer text-red-500' /> </div>
        </div>
      </li>
})}
      
    <div className="total mx-0 mt-10 text-black font-bold">Subtotal: ₹{subTotal}</div>
    </ol>
    <div className='flex mt-2'>
    <Link href={'/checkout'}>
    <button disabled={Object.keys(cart).length===0} className="flex disabled:bg-red-300 mr-2 text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm"> <BsFillBagCheckFill className='m-1' /> Checkout</button>
    </Link>

    <button disabled={Object.keys(cart).length===0}  onClick={()=>{clearCart()}} className="flex disabled:bg-red-300 ml-4 text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm"> Clear Cart</button>
    </div>


    </div>

  </div>
</header>
    </div>
  )
}

export default Navbar