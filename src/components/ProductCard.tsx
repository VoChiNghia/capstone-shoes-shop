import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ProductModel, RelatedProduct } from '../redux/configStore/productSlide'
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";
import { postLikeProductApi } from '../redux/configStore/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../store/store';

type Props = {
    prod:ProductModel | RelatedProduct
}

const ProductCard = ({prod}: Props) => {
    const dispatch:DispatchType = useDispatch()

  const {like,userLogin} = useSelector((state: RootState) => state.userReducer)



 const handleClick = (id:number) => {
    if(userLogin) {
        const action = postLikeProductApi(id)
        dispatch(action)
        return
    }
    console.log('you need login')
 }

  return (
   <div className="relative">
    <NavLink to={`/detail/${prod.id}`} className="">
        <div className="bg-[#F8F8F8] dark:bg-zinc-600 shadow-lg shadow-slate-600 relative">
        <img src={prod.image.includes('https://shop.cyberlearn.vn/images/')? prod.image: `https://shop.cyberlearn.vn/images/${prod.image}` } className="w-[300px]" alt=""/>
        <div className="card-body px-6">
            <h2 className="card-title text-2xl font-light py-3">{prod.name}</h2>
            <p className="text-slate-400">{prod.description.length > 100 ? `${prod.description.slice(0, 100)} ...` : prod.description}</p>
        </div>
        <div className="flex justify-between align-center my-5">
            <button className="bg-[#9DE167] dark:bg-violet-800 px-10 py-2 flex-1">Buy now</button>
            <div className="font-bold flex-1 text-center bg-gray-400 my-auto leading-10">85$</div>
        </div>
          
        </div>
    </NavLink >
    <div className="absolute right-5 top-3 heart" onClick={() => handleClick(prod.id)}>
        
        {prod.feature ? <AiFillHeart className="text-3xl text-red-600"/>:<AiOutlineHeart className="text-3xl"/>}
        </div>
   </div>
  )
}
export default ProductCard