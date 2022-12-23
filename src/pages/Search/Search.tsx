import React,{useEffect,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchResultApi, isLoadingState, ProductDetailModel, ProductModel } from '../../redux/configStore/productSlide'
import { DispatchType } from '../../store/store'
import { RootState } from '../../store/store'
import ProductCard from '../../components/ProductCard'
import Loading from '../../components/Loading'
import {motion} from 'framer-motion'
import {pageMotion} from '../../util/motion'
import _ from 'lodash'

type Props = {}

export default function Search({}: Props) {
  const dispatch:DispatchType = useDispatch()
  const {searchResults,isLoading} = useSelector((state:RootState) => state.productSlide)
  console.log(isLoading)
  const searchInput = useRef<string>('')
 
  const handleSearch = async () => {
    const action = getSearchResultApi(searchInput.current);
       await dispatch(action)
        dispatch(isLoadingState(false))
     
  }  
  console.log(searchResults)
  const renderSearchResult = () => {
   
   return searchResults?.length !== 0 ? <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-20 my-10">
    {
     searchResults?.map((result:ProductDetailModel,index:number) => (
       <ProductCard key={index} prod={result}/>
     ))
    }
   </div> : <h1 className='text-center my-12 text-2xl text-gray-400'>No Products Found</h1>
  }

  const handleClick = (e: any,name:string) => {
      document.querySelector('.decrease')?.classList.remove('active')
      document.querySelector('.ascending')?.classList.remove('active')
      e.target.classList.add('active')
      
  }
  return (
    <motion.div 
    initial="initial" animate="animate" exit="exit"
    variants={pageMotion}
    className="component">
      <div className="w-full sm:w-1/3 mx-5">
        <h1 className="my-2">Search</h1>
        <div className="flex align-center">
          <input className="input rounded-xl" type="text" placeholder="product name ..." onChange={(e) => searchInput.current  = e.target.value }/>
          <button className="button mx-2" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="gardient my-5">
        <h1 className="text-white text-3xl p-4 ">Search Results</h1>
      </div>

      <div className="m-12">
        <div className="w-full sm:w-1/3">
          <p>Price</p>
          <div className="input my-1 decrease" onClick={(e) => handleClick(e,'decrease')}>decrease</div>
          <div className="input my-1 ascending" onClick={(e) => handleClick(e,'ascending')}>ascending</div>
        </div>
        {isLoading 
        ? <Loading/>
        : renderSearchResult()
        }
      </div>
    </motion.div>
  )
}