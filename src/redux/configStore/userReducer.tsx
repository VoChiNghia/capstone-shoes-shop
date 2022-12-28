import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'


import { history } from '../..';
import { UserRegister } from '../../pages/Register/Register';
import { DispatchType } from '../../store/store';
import { ACCESS_TOKEN, getStore, getStoreJson, http, saveStore, saveStoreJson, USER_LOGIN } from '../../util/config';
import { useDispatch } from 'react-redux';



export interface FavoriteProductModel {
    productsFavorite: ProductsFavorite[];
    email:            string;
}

export interface ProductsFavorite {
    id:    number;
    name:  string;
    image: string;
}

export interface UserProfile {
    ordersHistory: OrdersHistory[];
    email:         String;
    name:          string;
    password:      null;
    gender:        boolean;
    phone:         string;
    facebookId:    string;
    deleted:       boolean;
    avatar:        string;
}

export enum String {
    KhaidoGmailCOM = "khaido@gmail.com",
}

export interface OrdersHistory {
    orderDetail: OrderDetail[];
    id:          number;
    date:        Date;
    status:      null;
    email:       String;
    alias:       string;
}

export interface OrderDetail {
    name:             string;
    alias:            string;
    shortDescription: string;
    quantity:         number;
    price:            number;
    image:            string;
    description:      string;
}

export interface UserLoginResult {
    email: string,
    accessToken:String
}
export type UserLoginModel = {
    email: string,
    password: string
}
export interface UserState {
    userLogin: UserLoginResult | null
    userProfile:UserProfile | null,
    registerUser:string | null
    favoriteProduct:FavoriteProductModel | null
    like:string,
    submitOrder:string,
    isLoading:boolean,
    updateProfile:string
}
const initialState:UserState = {
    userLogin: getStoreJson(USER_LOGIN) ? getStoreJson(USER_LOGIN) : null,
    userProfile: null,
    registerUser: null,
    favoriteProduct:null,
    like:'',
    submitOrder:'',
    isLoading:false,
    updateProfile:''
}

const  userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    registerState:(state:UserState,action:PayloadAction<string>) => {
        state.registerUser = action.payload
    },
    favoriteProdcutState:(state:UserState,action:PayloadAction<FavoriteProductModel>) => {
        state.favoriteProduct = action.payload
    },
    likeState:(state:UserState,action:PayloadAction<string>) => {
        state.like = action.payload
    },
    submitOrderState:(state:UserState,action:PayloadAction<string>)=>{
        state.submitOrder = action.payload
    },
    isLoadingState:(state:UserState,action:PayloadAction<boolean>)=>{
        state.isLoading = action.payload
    },
    updateProfileState:(state:UserState,action:PayloadAction<string>)=>{
        state.updateProfile = action.payload
    }

  },
  extraReducers(builder){
    builder.addCase(loginAsyncApit.pending,(state:UserState)=>{
        state.isLoading = true
    })
    builder.addCase(loginAsyncApit.fulfilled,(state:UserState, action:PayloadAction<UserLoginResult>) => {
            state.userLogin = action.payload
            saveStoreJson(USER_LOGIN,action.payload)
            saveStore(ACCESS_TOKEN,action.payload.accessToken)
            history.push('/ ')
            if(action.payload.email === ''){
                history.push('/login')
            }
          
            
    });
    builder.addCase(loginAsyncApiFb.fulfilled,(state:UserState, action:PayloadAction<UserLoginResult>)=>{
        state.userLogin = action.payload
        saveStoreJson(USER_LOGIN,action.payload)
        saveStore(ACCESS_TOKEN,action.payload.accessToken)
        history.push('/ ')
    })
    builder.addCase(getProfileAsynsApi.fulfilled,(state:UserState, action:PayloadAction<UserProfile>) => {
        state.userProfile = action.payload
    })

    
  }
});

export const { registerState,favoriteProdcutState,likeState,submitOrderState,isLoadingState,updateProfileState } =  userReducer.actions

export default  userReducer.reducer



// Signin
export const loginAsyncApit = createAsyncThunk('userReducer/login',async (dataUser:UserLoginModel):Promise<UserLoginResult> => {
       
        const respones = await http.post('/api/Users/signin',dataUser)
        return respones.data.content
    }
)
export const loginAsyncApiFb = createAsyncThunk('userReducer/loginfb',async (dataUser:string):Promise<UserLoginResult> => {
       let data:any = {
        facebookToken:dataUser
       }
    const respones = await http.post('/api/Users/facebooklogin',data)
    console.log(respones.data.content) 
    return respones.data.content
}
)


export const getProfileAsynsApi = createAsyncThunk('userReducer/getProfile',async ():Promise<UserProfile> => {
    const respones = await http.post('/api/Users/getProfile')
    return respones.data.content
})
// signup
export const registerUserApi = (data:UserRegister) => {

    return async (dispatch: DispatchType)=> {
       try {
        await dispatch(isLoadingState(true))
        const response = await http.post('/api/Users/signup',data)
        const action = registerState(response.data.message)
            dispatch(action)  
       } catch (error:any) {
        console.log(error.response.data.message)
              dispatch(registerState(error.response.data.message))
       }
    }
}


//get Favorite Product by category

export const getFavoriteProductApi = () =>{
    return async (dispatch: DispatchType) => {
      const response = await http.get('/api/Users/getproductfavorite')
      const action = favoriteProdcutState(response.data.content)
     await dispatch(action)
    }
  }


// post like product
export const postLikeProductApi = (id:number) =>{
    return async (dispatch: DispatchType) => {
      const response = await http.get(`/api/Users/like?productId=${id}`)
      const action = likeState(response.data.content)
      await dispatch(action)
    }
  }

// submit order
interface Order {
    "productId": number
    "quantity": number
}

export const submitOrderApi = (prodOrder:Order[],email:string) =>{

    const orderDetail = {
        "orderDetail": prodOrder,
        "email": email
      }

    return async (dispatch: DispatchType) => {
      const response = await http.post('/api/Users/order',orderDetail)
      const action = submitOrderState(response.data.content)
      dispatch(action)
    }
  }


  // update profile

  export const updateUserApi = (data:UserRegister) => {

    return async (dispatch: DispatchType)=> {
       try {
        await dispatch(isLoadingState(true))
        const response = await http.post('/api/Users/updateProfile',data)
        const action = updateProfileState(response.data.content)
            dispatch(action)  
       } catch (error:any) {
        
              dispatch(updateProfileState(error.response.data.content))
       }
    }
}