import { configureStore } from '@reduxjs/toolkit'
import productSlide from '../redux/configStore/productSlide'
import userReducer from '../redux/configStore/userReducer'
import categoryReducer from '../redux/configStore/categoryReducer'
import cartReducer from '../redux/configStore/cartReducer'

export const stores = configureStore({
    reducer:{
        productSlide,
        userReducer,
        categoryReducer,
        cartReducer
      
    }
})

export type RootState = ReturnType<typeof stores.getState>
export type DispatchType = typeof stores.dispatch