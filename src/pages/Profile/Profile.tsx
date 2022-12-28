import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../store/store'
import {useFormik} from 'formik'
import { getFavoriteProductApi, getProfileAsynsApi, OrdersHistory, updateUserApi, UserLoginResult } from '../../redux/configStore/userReducer'
import {motion} from 'framer-motion'
import {pageMotion} from '../../util/motion'
import OrderCard from '../../components/OrderCard'
import Pagination from '../../components/Pagination'
import _ from 'lodash'
import { NavLink } from 'react-router-dom'
import { AiFillHeart } from 'react-icons/ai'
import * as yup from "yup";
import { UserRegister } from '../Register/Register'
import { ToastContainer, toast } from 'react-toastify'
import { USER_LOGIN, getStore, getStoreJson } from '../../util/config'

type Props = {}

export default function Profile({}: Props) {
  const {userProfile,favoriteProduct} = useSelector((state:RootState) => state.userReducer)


  const dispatch:DispatchType = useDispatch()
  const newUserProfile = userProfile?.ordersHistory.filter(item => item.orderDetail.length != 0)

  const [currentPage,setCurrentPage] = useState<number>(1)
  const [postPerPage,setpostPerPage] = useState<number>(2)


  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const user:UserLoginResult = getStoreJson('userLogin')
  
  const formUserProfile = useFormik<UserRegister>({
    initialValues:{
      email:    '',
      password: '',
      name:     '',
      gender:   true,
      phone:    '',
    },
    validationSchema: yup.object().shape({
        email: yup.string().email( ),
        password: yup.string().required().min(3,'must be at least 3 charator'),
        name: yup.string().required(),
        phone: yup.string().required(),
      }),
      onSubmit:(values:UserRegister) =>{
          if(user.email === values.email){
            let action:UserRegister = values
            if( typeof values.gender == 'string'){
            if(values.gender === '0'){
            action = {...values, gender:false}
            } else{
            action = {...values, gender: true}
            }
            }


             dispatch(updateUserApi(action))
             toast.success("Update Successfullu")
          }else{
            toast.error("Update fail")
          }
       


        
        
       
       
      
       
    
        
        }
    
  })


  useEffect(() => {
      const profileActiion = getProfileAsynsApi()
      const favoriteAction = getFavoriteProductApi()
      dispatch(profileActiion)
      dispatch(favoriteAction)
  },[])

  const handleClick = (e:any,name: string) => {
    document.querySelector('.history')?.classList.remove('orderHistoryActive')
    document.querySelector('.favorite')?.classList.remove('orderHistoryActive')

    const tabcontent: NodeListOf<Element> = document.querySelectorAll('.tabcontent')
    for(let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.add('hidden')
    }

    e.target.classList.add('orderHistoryActive')
    document.getElementById(name)?.classList.remove('hidden')
  }
  return (
    <motion.div
    initial="initial" animate="animate" exit="exit"
    variants={pageMotion}
    className="container border-b-2 border-gray-100 dark:text-gray-400">
      <div className="gardient my-5 md:w-1/3 w-full">
        <h1 className="text-white text-3xl p-4  ">Profile</h1>
      </div>
      
      <div className="flex items-center flex-col md:flex-row">
        <div className="md:w-1/4">
          <img src={userProfile?.avatar} className="rounded-full w-15 p-5" alt="" />
        </div>
        <div className="flex-grow">
          <form onSubmit={formUserProfile.handleSubmit}>
            <div className="grid md:grid-cols-12 grid-cols-1">
              <div className="col-span-6">
                <div className="form-group m-10">
                  <p>Email</p>
                  <input className="input dark:bg-gray-600/30 border-none " type="text" name="email" placeholder={userProfile?.email} onChange={formUserProfile.handleChange}/>
                  {formUserProfile.errors.email && <p className="text-red-600 text-xs">{formUserProfile.errors.email}</p>}
                </div>
                <div className="form-group m-10">
                  <p>Phone</p>
                  <input className="input dark:bg-gray-600/30 border-none" type="text" name="phone" placeholder={userProfile?.phone} onChange={formUserProfile.handleChange}/>
                  {formUserProfile.errors.phone && <p className="text-red-600 text-xs">{formUserProfile.errors.phone}</p>}
                </div>
              </div>
              <div className="col-span-6">
              <div className="form-group m-10">
                  <p>Name</p>
                  <input className="input dark:bg-gray-600/30 border-none" type="text" name="name" placeholder={userProfile?.name} onChange={formUserProfile.handleChange}/>
                  {formUserProfile.errors.name && <p className="text-red-600 text-xs">{formUserProfile.errors.name}</p>}
                </div>
                <div className="form-group m-10">
                  <p>Password</p>
                  <input className="input dark:bg-gray-600/30 border-none" type="password" name="password" placeholder="password..." onChange={formUserProfile.handleChange}/>
                  
                </div>
                <div className="form-group m-10">
                <div className="my-2">
                  <p>Gender</p>
                  <input type="radio" name="gender" value='1' onChange={formUserProfile.handleChange}/>Male
                  <input type="radio" name="gender" value='0' onChange={formUserProfile.handleChange}/>Female
                  </div>
                  <div>
                    <button type="submit" className="button"> Update </button>
                  </div>


                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr />
        <ToastContainer position="bottom-right"/>
      <div className="m-2 md:m-12">
        <div className="flex">
          <h1 className=" text-sm md:text-4xl border-r-2 border-b-2 px-4 md:px-10 pb-1 border-l-2 cursor-pointer history orderHistoryActive" onClick={(e) => handleClick(e,'history-content')}>Orders History</h1>
          <h1 className="px-4 md:px-10 text-sm md:text-4xl border-b-2 pb-1 border-r-2 cursor-pointer favorite" onClick={(e) => handleClick(e,'favorite-content')}>Favorite</h1>
        </div>
       <div id="history-content" className="tabcontent">
       {
          newUserProfile?.slice(firstPostIndex,lastPostIndex).map((item:OrdersHistory,index:number) => (
           item.orderDetail.length == 0 ? '' : <OrderCard key={index} ordersHistory={item}/>
          ))
        }

       <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={Number(newUserProfile?.length) - 22} postPerPage={postPerPage}/>
       </div>

       <div id='favorite-content' className="tabcontent hidden ">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 p-12">
              {
                favoriteProduct?.productsFavorite.map((item,index) => (
                  <div key={index} className="relative h-full">
                     <NavLink to={`/detail/${item.id}`} className="">
                    <div className="bg-[#F8F8F8] dark:bg-zinc-800 h-full shadow-xl relative flex flex-col justyfy-between">
                    <img src={item.image} className="w-[300px] flex-grow" alt=""/>
                    <div className="card-body px-6">
                        <h2 className="card-title text-2xl font-light py-3">{item.name}</h2>
                      
                    </div>
                    <div className="flex justify-between align-center">
                        <button className="bg-[#9DE167] dark:bg-violet-800 px-10 py-2 flex-1">Buy now</button>
                        <div className="font-bold flex-1 text-center bg-gray-400 dark:text-white  my-auto leading-10">85$</div>
                    </div>
                      
                    </div>
                </NavLink >
                <div className="absolute right-5 top-3 heart text-red-500"><AiFillHeart className="text-3xl"/></div>
                  </div>
                ))
              }
            </div>
       </div>

        
      </div>
    </motion.div>
  )
}