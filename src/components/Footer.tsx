import React from 'react'

type Props = {}

export default function Footer({}: Props) {
  return (
    <>
    <div className=" bg-white dark:bg-black dark:text-white flex flex-col sm:flex-row justify-around md:mx-28 my-12">
      <div className="border-r flex-1 px-14">
        <h2 className="font-bold text-xl">GET HELP</h2>
        <ul className="text-sm">
          <li className="py-2 hover:bg-gray-100 px-2">Home</li>
          <li className="py-2 hover:bg-gray-100 px-2">Nike</li>
          <li className="py-2 hover:bg-gray-100 px-2">Adidas</li>
          <li className="py-2 hover:bg-gray-100 px-2">Contact</li>
        </ul>
      </div>

      <div className="border-r flex-1 px-14">
        <h2 className="font-bold text-xl">GET HELP</h2>
        <ul className="text-sm">
        <li className="py-2 hover:bg-gray-100 px-2">Home</li>
          <li className="py-2 hover:bg-gray-100 px-2">Nike</li>
          <li className="py-2 hover:bg-gray-100 px-2">Adidas</li>
          <li className="py-2 hover:bg-gray-100 px-2">Contact</li>
        </ul>
      </div>

      <div className=" flex-1 px-14">
        <h2 className="font-bold text-xl">GET HELP</h2>
        <ul className="text-sm">
        <li className="py-2 hover:bg-gray-100 px-2">Home</li>
          <li className="py-2 hover:bg-gray-100 px-2">Nike</li>
          <li className="py-2 hover:bg-gray-100 px-2">Adidas</li>
          <li className="py-2 hover:bg-gray-100 px-2">Contact</li>
        </ul>
      </div>
      
    </div>

    <div className="bg-[#F5F5F5] dark:bg-zinc-800 dark:text-gray-600 py-4 text-xs md:text-md text-center font-semibold">
      <p>© 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải.</p>
    </div>
    
    </>
  )
}