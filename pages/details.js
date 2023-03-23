import React from 'react'

const Details = () => {
  return (
    <div className='h-[80vh]'>
        <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h2 className="text-xs text-red-500 tracking-widest font-medium title-font mb-1">CodeShop</h2>
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">An E-commerce Store</h1>
    </div>
    <div className="flex flex-wrap -m-4">
      <div className="p-4  md:w-1/2">
        <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white flex-shrink-0">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
           
            <h2 className="text-gray-900 text-lg title-font font-bold">Features</h2>
          </div>
          <div className="flex-grow">
            <ul className='list-disc mx-7 text-black font-medium '>
                <li>Login, Signup and forgotpassword functionalities.</li>
                <li>Used Bcrypt.js for encryption.</li>
                <li>Add a product in the backend.</li>
                <li>No tampering allowed in the cart using inspect element</li>
                <li>Add products you want to buy to your cart.</li>
                <li>Payment gateway also added.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/2">
        <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white flex-shrink-0">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
           
            <h2 className="text-gray-900 text-lg title-font font-bold">Technologies Used</h2>
          </div>
          <div className="flex-grow">
            <ul className='list-disc mx-7 text-black font-medium pr-[140px]'>
                <li>ReactJS</li>
                <li>NextJS</li>
                <li>ExpressJS</li>
                <li>NodeJS</li>
                <li>MongoDB</li>
                <li>Tailwind CSS</li>
           
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Details