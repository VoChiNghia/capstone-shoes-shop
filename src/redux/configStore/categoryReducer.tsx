import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../../store/store';
import { http } from '../../util/config';


export interface CategoryModel {
  id:             string;
  category:       string;
  categoryParent: string;
  categoryChild:  string;
  deleted:        boolean;
  productList:    string;
  alias:          string;
}
export interface Category {
  categories:CategoryModel[]
}
const initialState:Category = {
      categories:[]
}

const categoryReducer = createSlice({
  name: 'categoryReducer',
  initialState,
  reducers: {
    categoriesState:(state:Category,action:PayloadAction<CategoryModel[]>) => {
        state.categories = action.payload
    }

  }
});

export const { categoriesState } = categoryReducer.actions

export default categoryReducer.reducer

export const getAllCategoryApi = ()=>{
  return async (dispatch: DispatchType)=>{
    const result = await http.get('/api/Product/getAllCategory')
    const action:PayloadAction<CategoryModel[]> = categoriesState(result.data.content)
    dispatch(action)
  }
}