import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div className=''>

      <Head>
        <title>CodesWear.com - Wear the code</title>
        <meta name="description" content="CodesWear.com - Wear the code" />
        <link rel="icon" href="logo-modified.ico" />
      </Head>
    
      <div>
        {/* <img src="" alt="" /> */}
      </div>

    {/* content */}
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Welcome to the codeshop</h1>
      <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Tryout different things at this place.</p>
    </div>
    <div className="flex flex-wrap -m-4">
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <Link href={'/tshirts'}>
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Tshirts</h2>
          <p className="leading-relaxed text-base">Buy and try t-shirts</p>
        </div>
        </Link>
      </div>

      <div className="xl:w-1/3 md:w-1/2 p-4 ">
      <Link href={'/hoodies'}>
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
            </svg>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Hoodies</h2>
          <p className="leading-relaxed text-base">See the awesome hoodies</p>
        </div>
      </Link>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
      
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">TryOn for the t-shirts</h2>
          <p className="leading-relaxed text-base">This feature will be available soon</p>
        </div>
      
      </div>
      
      <div className="xl:w-1/3 md:w-1/2 p-4">
      
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
            </svg>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">TechStack Used So far in this project</h2>
          <p className="leading-relaxed text-base">NextJS, ReactJS, MongoDB, TailwindCSS, NodeJS </p>
        </div>
      
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
      <Link href={'/details'}>
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            </svg>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">More Details</h2>
          <p className="leading-relaxed text-base">Click to know more about the project</p>
        </div>
      </Link>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
      <Link href={'/aboutDev'}>
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">About Developer</h2>
          <p className="leading-relaxed text-base">Click to know more about the Developer</p>
        </div>
      </Link>
      </div>
    </div>
     </div>
</section>

      
      
    </div>
    </>
  )
}
