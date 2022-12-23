import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../../store/store";
import axios from "axios";
import { http } from "../../util/config";

export interface ProductDetailModel {
  id: number;
  name: string;
  alias: string;
  price: number;
  feature: boolean;
  description: string;
  size: string[];
  shortDescription: string;
  quantity: number;
  image: string;
  categories: Category[];
  relatedProducts: RelatedProduct[];
}

export interface Category {
  id: string;
  category: string;
}

export interface RelatedProduct {
  id: number;
  name: string;
  alias: string;
  feature: boolean;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
}

export interface ProductPerPage {
  items:     ProductModel[];
  pageIndex: number;
  pageSize:  number;
  totalRow:  number;
  keywords:  string;
}

export type ProductModel = {
  id: number;
  name: string;
  alias: string;
  price: number;
  description: string;
  size: string;
  shortDescription: string;
  quantity: number;
  deleted: boolean;
  categories: string;
  relatedProducts: string;
  feature: boolean;
  image: string;
};
export type ProductState = {
  arrProduct: ProductModel[];
  productDetail: ProductDetailModel | null;
  searchResults: ProductDetailModel[] | null;
  categoryProduct: ProductDetailModel[] | null;
  productPerPage: ProductPerPage | null;
  isLoading: boolean;
};
const initialState: ProductState = {
  arrProduct: [],
  productDetail: null,
  searchResults:[],
  categoryProduct:[],
  isLoading: false,
  productPerPage: null,
};
const productSlide = createSlice({
  name: "productSlide",
  initialState,
  reducers: {
    arrProductAction: (
      state: ProductState,
      action: PayloadAction<ProductModel[]>
    ) => {
      state.arrProduct = action.payload;
    },
    
    searchResultsState:(state: ProductState,action: PayloadAction<ProductDetailModel[]>) => {
      state.searchResults = action.payload;
    },
    categoryProductState:(state: ProductState,action: PayloadAction<ProductDetailModel[]>) => {
      state.categoryProduct = action.payload;
    },
    isLoadingState:(state: ProductState,action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    productPerPage:(state:ProductState,action:PayloadAction<ProductPerPage>) => {
      state.productPerPage = action.payload
    }
  },
  
  extraReducers(builder) {
    builder.addCase(getProductDetailApi.pending,(state, action) => {})
    builder.addCase(getProductDetailApi.fulfilled,(state:ProductState, action:PayloadAction<ProductDetailModel>) => {
        state.productDetail = action.payload
    })
    builder.addCase(getProductDetailApi.rejected,(state, action) => {})
  },
});

export const { arrProductAction,searchResultsState,isLoadingState,productPerPage,categoryProductState } = productSlide.actions;
export default productSlide.reducer;

// action api

export const getProductApi = () => {
  return async (dispatch: DispatchType) => {
    try {
       await dispatch(isLoadingState(true))
      const result = await http.get("/api/Product")
      const content = result.data.content;

      const action: PayloadAction<ProductModel[]> = arrProductAction(content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};


export const getProductDetailApi = createAsyncThunk(
  'productSlide/getProductDetailApi',
  async (id:string) => {
    
      const response = await http.get(`/api/Product/getbyid?id=${id}`)
      return response.data.content
  }
)

// get api search result

export const getSearchResultApi = (name:string) => {
  return async (dispatch: DispatchType) => {
  
      dispatch(isLoadingState(true))
     
    const response = await http.get(`/api/Product?keyword=${name}`)
    const action = searchResultsState(response.data.content) 
    dispatch(action)
    
  }
}
// pagination
export const getProductPerPageApi = (pageIndex:number) => {
  return async (dispatch:DispatchType) => {
    const response = await http.get(`/api/Product/getpaging?pageIndex=${pageIndex}&pageSize=6`)
    const action = productPerPage(response.data.content) 
    dispatch(action)
  }
}
//get product by category
export const getProductByCategory = (name:string) => {
  return async (dispatch: DispatchType) => {
  
      dispatch(isLoadingState(true))
     
    const response = await http.get(`/api/Product/getProductByCategory?categoryId=${name}`)
    const action = categoryProductState(response.data.content) 
    dispatch(action)
    
  }
}



