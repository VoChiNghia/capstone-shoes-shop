import React, { useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import ProductCard from '../../components/ProductCard'
import { getAllCategoryApi } from '../../redux/configStore/categoryReducer'
import { getProductApi, getProductPerPageApi, isLoadingState, ProductModel } from '../../redux/configStore/productSlide'
import { DispatchType, RootState } from '../../store/store'

import Carousel from '../../components/Carousel'
import Loading from '../../components/Loading'
import {motion} from 'framer-motion'
import {pageMotion} from '../../util/motion'
import Pagination from '../../components/Pagination'
import { getFavoriteProductApi } from '../../redux/configStore/userReducer'
import _ from 'lodash'

type Props = {}

export default function Home({}: Props) {
 const {arrProduct,isLoading,productPerPage} = useSelector((state:RootState) => state.productSlide)

const {favoriteProduct} = useSelector((state:RootState) => state.userReducer)

 const [pageIndex,setPageIndex] = useState<number>(1)

 const dispatch:DispatchType = useDispatch()


 const getCategory = () => {
  const actionAsyns = getAllCategoryApi()
  dispatch(actionAsyns)
 }

  const getAllProducts = async () => {
      const actionAsync = getProductApi()
       dispatch(actionAsync)
      dispatch(isLoadingState(false))
  }

  const getProductPerPage = async () => {
    const action = getProductPerPageApi(pageIndex)
    dispatch(action)
    dispatch(isLoadingState(false))
  }


 useEffect(() =>{
  getCategory()
  getProductPerPage()
  getCategory()
  getAllProducts()

  // const favoriteAction = getFavoriteProductApi()
  //     dispatch(favoriteAction)
 },[pageIndex])

  return (
    <motion.div 
     className="component"
     initial="initial"
     animate="animate" 
     exit="exit"
     variants={pageMotion}

    >
        <Carousel arrProduct={arrProduct}/>
      {/* <Carousel/> */}
    <div className=" bg-[#F5F5F5] dark:bg-black py-12">
      <div className= "gardient w-full lg:w-6/12">
      <h4 className="text-white py-4 text-xl md:text-3xl mx-5">Product Feature</h4>
      </div>
      <div className="">
        {
          isLoading 
          ? <Loading/>
          : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 m-12">
          {
            productPerPage?.items.map((product:ProductModel,index:number) => (
              <ProductCard key={index} prod={product}/>
            ))

          }
      </div>
        }
      </div>
    </div>
      <Pagination currentPage={pageIndex} setCurrentPage={setPageIndex} totalPages={Number(productPerPage?.totalRow)} postPerPage={6}/>
        
    </motion.div>
  )
}