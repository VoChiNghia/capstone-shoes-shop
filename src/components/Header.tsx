import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../store/store";
import { ACCESS_TOKEN, removeStore, USER_LOGIN } from "../util/config";
import { Navbar } from "./Navbar";
import { AiOutlineShoppingCart,AiOutlineSearch } from "react-icons/ai";


type Props = {};

export default function Header({}: Props) {
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const {categories} = useSelector((state:RootState) => state.categoryReducer)
  const {cartState} = useSelector((state:RootState) => state.cartReducer)



  const renderLoginUI = () => {

    if (userLogin) {
      return (
        <div className="flex item-center">
          <h1 className="leading-10">{userLogin.email}</h1>
          <NavLink to="/profile">
            <button className="mx-2 bg-white px-4 py-2 hover:shadow-lg active:scale-50 transiton duration-150 text-black shadow-lg" >Profile</button>
          </NavLink>
          <NavLink to="/login">
            <button
              onClick={() => {
                removeStore(USER_LOGIN);
                removeStore(ACCESS_TOKEN);
                window.location.reload();
              }}
              className="mx-2 bg-white px-4 py-2 hover:shadow-lg active:scale-50 transiton duration-150 text-black shadow-lg"
            >
              Logout
            </button>
          </NavLink>
        </div>
      );
    } else {
      return (
        <>
          <NavLink to="/login" className="mx-2">
            <button className="button ">
              Login
            </button>
          </NavLink>
          <NavLink to="/register" className="mx-2">
            <button className="button-outline active:scale-50 transiton duration-150">
              Register
            </button>
          </NavLink>
        </>
      );
    }
    
  };
  return (
    <>
      <div className="bg-black shadow-sm shadow-gray-600 fixed w-full z-10 text-white flex justify-between py-2 items-center">
      <NavLink to='/'> <img className="mx-1 md:mx-5" src="./img/image3.png" alt="" /></NavLink>
       
       <div className="flex items-center">
        <NavLink to='/carts'>
        <p className="mx-2 relative p-1">
          <AiOutlineShoppingCart className="text-xl md:text-3xl"/>
          <p className="absolute top-0 right-0 text-red-500  bg-white w-4 h-4 leading-4 text-center text-xs rounded-full">{cartState.length}</p>
          </p>
        </NavLink>
        <NavLink to='/search'><p className="mx-1 md:mx-5"><AiOutlineSearch className="text-xl md:text-3xl"/></p></NavLink>
        {renderLoginUI()}
       </div>
      </div>
      <Navbar cate={categories}/>
    </>
  );
}
