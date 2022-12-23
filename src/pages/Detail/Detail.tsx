import {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import { getProductDetailApi, RelatedProduct } from '../../redux/configStore/productSlide'
import { DispatchType, RootState } from '../../store/store'
import {CartModel, cartState} from '../../redux/configStore/cartReducer'
import { history } from '../..'
import { ToastContainer, toast } from 'react-toastify'



type Props = {}

export default function Detail({}: Props) {
  window.scrollTo({
    top: 0,
    behavior: `smooth`
  })
  const [quantity,setQuantity] = useState<number>(1);
  const [size,setSize] = useState<string>('36');
  const {productDetail} = useSelector((state:RootState) => state.productSlide)
  const { userLogin } = useSelector((state: RootState) => state.userReducer);


  const dispatch:DispatchType = useDispatch()
  const paramId = useParams()
  const getProductApiById = () => {
    
    const id = paramId.id
    const actionThunk = getProductDetailApi(id as string)
    dispatch(actionThunk)
  }

  const handleQuantity = (value:string) => {
    if(value === 'giam'){
      quantity <= 1 ? setQuantity(1) : setQuantity(quantity - 1)
    }else
    setQuantity(quantity + 1)
  }

  const handleClickAdd = () => {
    if(userLogin){
      const action:CartModel = {
        id:Number(productDetail?.id),
        img:productDetail?.image!,
        price:Number(productDetail?.price),
        name:productDetail?.name!,
        quantity:quantity,
        size:size
      }
     dispatch(cartState(action))
     toast("Add successfully")
    }else{
      history.push('/login')
    }
    
  }
 
  useEffect(() => {
      getProductApiById()
  },[paramId.id])
  return (
    <div className="container mx-auto">
       <div className="grid grid-cols-12 m-12 dark:text-gray-600">
            <div className="col-span-5">
            <div className="bg-gray-100 dark:bg-gray-900/40  w-4/5 text-center">
            <img src={productDetail?.image} alt="" width="350" height="350" className="mx-auto"/>
            </div>
            </div>
            <div className="col-span-7">
            <h3 className="text-4xl dark:text-white">{productDetail?.name}</h3>
            <p className="my-2">{productDetail?.description}</p>
            <p className="my-2 text-2xl text-green-400">Avalible size</p>
            
              <ul className="flex my-3">
              {
                productDetail?.size.map((item:string,index:number) => (
                    <li className={`p-3 bg-gray-300 dark:bg-gray-600 dark:text-white font-bold mr-5 hover:opacity-80 ${item == size ? 'sizeActive' : ''}`} onClick={() => setSize(item)} key={index}>{item }</li>
                    ))
                  }
                  </ul>

                  <p className="text-2xl font-bold text-red-600 my-5">{productDetail?.price}$</p>
                  <div className="flex items-center">
                    <button className="px-4 py-2 bg-gradient-to-b from-[#6181F3] to-[#7C97F5] text-white" onClick={() => handleQuantity('giam')}>-</button>
                    <p className='mx-4 font-bold'>{quantity}</p>
                    <button className="px-4 py-2 bg-gradient-to-b from-[#6181F3] to-[#7C97F5] text-white" onClick={() => handleQuantity('tang')}>+</button>
                  </div>
                  <button className="active:scale-50 bg-gradient-to-r from-[#3E20F8] to-[#D017EE] text-white py-3 px-6 my-5" onClick={handleClickAdd}>Add to card</button>
                  <ToastContainer />
            </div>
       </div>

       <h3 className="text-center font-bold text-3xl my-5">--Related Product--</h3>
       <div className="grid grid-cols-3 gap-10 m-5">
       {
        productDetail?.relatedProducts.map((item:RelatedProduct,index:number) => (
           <ProductCard prod={item} key={index}/>
           ))
          }
          </div>
    </div>
  )
}
