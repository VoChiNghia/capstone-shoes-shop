import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



// import required modules
import { Navigation, Pagination } from "swiper";
import { ProductModel } from "../redux/configStore/productSlide";


import {history} from "../index"
import '../Style/style.css'


type Props = {
  arrProduct:ProductModel[]
}

const Carousel = ({arrProduct}: Props) => {
 const handleClick = (id:number) => {
    history.push(`/detail/${id}`)
 }
  return (
    <div className="px-12 dark:bg-zinc-800 hidden md:block">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
       
        className="mySwiper"
      >
        {
          arrProduct.slice(0,4).map((item:ProductModel,index:number) =>(
            <SwiperSlide key={index}>
              <div className='flex items-center mx-12'>
              
              <div className='flex-1'>
              <img  src={item.image} alt="" className=''/>
              </div>
              <div className='flex-1'>
                <h1 className='font-bold text-xl my-3'>{item.name}</h1>
                <p className='text-gray-200 my-3'>{item.description}</p>
                
                  <button className="button" onClick={() => handleClick(item.id)}>Buy Now</button>
                 
              </div>

              

              </div>
              </SwiperSlide>
          ))
        }
        
        
        
      </Swiper>
    </div>

  )
}

export default Carousel