import { PayloadAction, createSlice } from '@reduxjs/toolkit'


export interface CartModel {
    id: number,
    img: string,
    name: string,
    price:number,
    quantity:number,
    size:string
}

interface CartState {
    cartState:CartModel[] | []
}

const initialState:CartState = {
    cartState:[]
}

const cartReducer = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    cartState:(state:CartState,action: PayloadAction<CartModel>) => {

        const duplicate = state.cartState.find(prod => prod.id === action.payload.id)
        let cartProduct = state.cartState
        if(duplicate) {
           const newProd = {...duplicate,size:action.payload.size,quantity:action.payload.quantity}
           for(let i in cartProduct){
            if(cartProduct[i].id === duplicate.id){
                cartProduct[i] = newProd
            }
           }  
        }else{
            cartProduct = [...state.cartState,action.payload]
        }

          

       
        state.cartState = cartProduct
        
    },
    cartDel:(state:CartState,action: PayloadAction<number>) =>{
          const newState =  state.cartState.filter(prod => prod.id !== action.payload)
          state.cartState = newState
    }
  }
});

export const { cartState,cartDel } = cartReducer.actions

export default cartReducer.reducer

