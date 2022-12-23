import React,{useState} from "react";
import { DispatchType, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { CartModel } from "../../redux/configStore/cartReducer";
import { cartDel } from "../../redux/configStore/cartReducer";
import { BsCart4 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import _ from 'lodash'
import { submitOrderApi } from "../../redux/configStore/userReducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

export default function Cart({}: Props) {

  const { cartState } = useSelector((state: RootState) => state.cartReducer);
  const {userLogin,submitOrder} = useSelector((state: RootState) => state.userReducer)
  const dispatch: DispatchType = useDispatch();
  
  const handleDel = (id: number) => {
    dispatch(cartDel(id));
  };


  const handerSubmitOrder = () => {
    const cartList = cartState.map(item => _.pick(item, ['id','quantity']))
    const action =  cartList.map(item => ({ "productId":item.id,
    "quantity": item.quantity}))
    dispatch(submitOrderApi(action,userLogin.email))
    if(submitOrder) toast(submitOrder);
  }
  
  return (
    <div className="container w-full my-12">
      <h1 className="text-4xl py-10 mx-12 dark:text-white ">Cart</h1>
      <hr className="py-3" />
      <div className="w-3/4 mx-auto my-12">
        {cartState.length > 0 ? (
         <>
          <table className="w-full dark:text-white border border-gray-800 my-10">
            <thead className="">
              <tr className="bg-gray-300 dark:bg-zinc-800">
                <th className="px-2">id</th>
                <th className="px-2">image</th>
                <th className="px-2">name</th>
                <th className="px-2">price</th>
                <th className="px-2">Size</th>
                <th className="px-2">quantity</th>
                <th className="px-2">total</th>
                <th className="px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartState.map((item: CartModel, index: number) => (
                <>
               
                <tr key={index}>
                  
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">
                    <img className="w-20 mx-auto" src={item.img} alt="" />
                  </td>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item.price}$</td>
                  <td className="text-center">{item.size}</td>

                  <td className="text-center">
                    
                    {item.quantity}
                   
                  </td>
                  <td className="text-center text-red-500 font-bold">
                    {item.price * item.quantity}$
                  </td>
                  <td className="text-center">
                    <button
                      className="px-4 py-1 shadow-lg bg-red-600 text-white mx-2"
                      onClick={() => handleDel(item.id)}
                    >
                      Delete
                    </button>
                   
                    <ToastContainer />
                  </td>
                </tr>
                </>
              ))}
            </tbody>
          </table> 
          <button className="float-right px-2 py-1 text-white bg-yellow-400 rounded-xl active:scale-50 hover:opacity-80"  onClick={() => handerSubmitOrder()}>Submit order</button>
         </>
         
        ) : (
          <div className="flex items-center flex-col">
            <BsCart4 className="text-9xl text-gray-200" />

            <h1 className="text-2xl my-10 text-gray-300 font-semibold">
              You have no product
            </h1>

            <NavLink to='/'><button className="button-outline">Shop Now</button></NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
