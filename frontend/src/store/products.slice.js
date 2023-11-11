import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: 'products',
    initialState:{
        selectedProducts: [],
        selectedTemplate:{}
    },
    reducers:{
        appendProducts: (state, action) => {
            state.selectedProducts = state.selectedProducts.length === 0 ? [action.payload] : [...state.selectedProducts, action.payload];
          },
        removeProducts:(state,action) =>{
            state.selectedProducts = state.selectedProducts.filter((product) => product.article_number !== action.payload.article_number)
        },
        findTemplates:(state, action) => {
            state.selectedTemplate = action.payload
        },
    }
})


export const {appendProducts, findTemplates, removeProducts} = productsSlice.actions
export const productsReducer = productsSlice.reducer
export default productsSlice.reducer