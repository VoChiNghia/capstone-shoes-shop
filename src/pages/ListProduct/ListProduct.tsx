import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductDetailModel, getProductByCategory, getSearchResultApi, isLoadingState } from '../../redux/configStore/productSlide'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState} from '../../store/store'
import ProductCard from '../../components/ProductCard'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'

type Props = {}

const ListProduct = (props: Props) => {
const dispatch:DispatchType = useDispatch()
const {categoryProduct,isLoading} = useSelector((state:RootState) => state.productSlide)
const [currentPage,setCurrentPage] = useState<number>(1)

const lastPostIndex = currentPage * 6 
const firstPostIndex = lastPostIndex - 6


  const param = useParams()
    const getCategory = async () => {
        
       if(typeof param.slug === 'string'){
        const action = getProductByCategory(param.slug.replace(' ', '_'))
          await dispatch(action)
          dispatch(isLoadingState(false))
       }
      
    }
    useEffect(() => {
        getCategory()
       
    },[])
  
  return (
    <div className="text-center">
        <h1 className="my-12 font-bold text-xl sm:text-4xl dark:text-white">--{param.slug?.toUpperCase()}--</h1>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 mx-12">
       {
            isLoading 
            ? <Loading/> 
            : categoryProduct?.slice(firstPostIndex,lastPostIndex).map((item:ProductDetailModel,index:number) =>(
                <ProductCard key={index} prod={item}/>
                )) 
                
        }
        
       </div>
       <Pagination totalPages={Number(categoryProduct?.length)} currentPage={currentPage} setCurrentPage={setCurrentPage} postPerPage={6} />
    </div>
  )
}

export default ListProduct