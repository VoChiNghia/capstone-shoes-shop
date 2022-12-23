import React from "react";
import { CategoryModel } from "../redux/configStore/categoryReducer";
import { NavLink } from 'react-router-dom'
import { BsFillCloudMoonFill, BsFillCloudSunFill, BsMoon, BsSun } from "react-icons/bs";
import {themeSwitch} from '../util/darkMode'

type Prop = {
  cate: CategoryModel[];
};

export const Navbar = ({ cate }: Prop) => {

  const renderCate = () => {
    if(cate.length !== 0){
     return cate.map((item: CategoryModel) => (
        <NavLink to={`/listproduct/${item.category.toLowerCase()}`} key={item.id}>
        <li className="p-1 text-xs md:text-lg md:p-4 hover:bg-slate-300" >
          {item.category}
        </li>
        </NavLink>
      ))
    }else{
      return <>
      <NavLink to={`/listproduct/adidas`}>
          <li className="p-1 text-xs md:text-lg md:p-4 hover:bg-slate-300" >
            ADIDAS
          </li>
      </NavLink>
      <NavLink to={`/listproductmen`}>
          <li className="p-1 text-xs md:text-lg md:p-4 hover:bg-slate-300" >
          MEN
          </li>
      </NavLink>
      <NavLink to={`/listproduct/nike`}>
          <li className="p-1 text-xs md:text-lg md:p-4 hover:bg-slate-300" >
            NIKE
          </li>
      </NavLink>
      <NavLink to={`/listproduct/vans_converse`}>
          <li className="p-1 text-xs md:text-lg md:p-4 hover:bg-slate-300" >
            VANS CONVERSE
          </li>
      </NavLink>
      <NavLink to={`/listproduct/women`}>
          <li className="p-1 text-xs md:text-lg md:p-4 hover:bg-slate-300" >
            WOMEN
          </li>
      </NavLink>
      </>
    }
  }

  return (
    <div className="mx-5 dark:text-white dark:shadow-sm shadow-gray-800 hover:cursor-pointer transition duration-200 flex justify-between items-center">
      <ul className="flex">
        {
          renderCate()
        }
      </ul>
      <div>
        
        <BsSun onClick={themeSwitch} className=" md:text-xl  hidden sun"/>
        <BsMoon onClick={themeSwitch} className="md:text-xl moon "/>
      </div>
    </div>
  );
};
