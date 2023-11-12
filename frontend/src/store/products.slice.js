import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: 'products',
    initialState:{
        selectedProducts: [],
        selectedTemplate: JSON.parse(localStorage.getItem('templateInfo'))
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
        setProductAligns:(state,action) =>{
            const article_number= action.payload.article_number;
            state.selectedProducts = state.selectedProducts.map((product) => {
                if (product.article_number === article_number) {
                    return {
                        ...product,
                        align: action.payload.align
                    };
                }
                return product;
            });
        },
        setProductTransImg:(state,action) =>{
            const article_number= action.payload.article_number;
            state.selectedProducts = state.selectedProducts.map((product) => {
                if (product.article_number === article_number) {
                    return {
                        ...product,
                        transImg: action.payload.transImg
                    };
                }
                return product;
            });
        },
        setSliderScale:(state,action) =>{
            const article_number= action.payload.article_number;
            state.selectedProducts = state.selectedProducts.map((product) => {
                if (product.article_number === article_number) {
                    return {
                        ...product,
                        sliderScale: action.payload.sliderScale
                    };
                }
                return product;
            });
        },
    }
})


export const {appendProducts, findTemplates, removeProducts, setProductAligns, setProductTransImg, setSliderScale} = productsSlice.actions
export const productsReducer = productsSlice.reducer
export default productsSlice.reducer