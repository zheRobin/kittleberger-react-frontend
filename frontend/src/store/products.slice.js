import { createSlice, current  } from "@reduxjs/toolkit";
import { calcPosition } from "../_services/Product";

export const productsSlice = createSlice({
    name: 'products',
    initialState:{
        selectedProducts: [],
        selectedTemplate: JSON.parse(localStorage.getItem('templateInfo')),
        composedProduct:'https://jdffrqoludeprmyyavwe.supabase.co/storage/v1/object/public/lenderprism/bg.jpg'
    },
    reducers:{
        appendProducts: (state, action) => {
            console.log(action.payload)
            state.selectedProducts = state.selectedProducts.length === 0 ? [action.payload] : [...state.selectedProducts, action.payload];
          },
        removeProducts:(state,action) =>{
            state.selectedProducts = state.selectedProducts.filter((product) => product.article_number !== action.payload.article_number)
        },
        findTemplates:(state, action) => {
            state.selectedTemplate = action.payload
        },
        setComposedProduct:(state, action) => {
            state.composedProduct = action.payload
        },
        setProductAligns:(state,action) =>{
            const article_number= action.payload.article_number;
            const selectedTemplate = current(state.selectedTemplate)
            state.selectedProducts = state.selectedProducts.map((product,index) => {
                if (product.article_number === article_number) {
                    let sliderScale = product?.sliderScale ?? 1;
                    let position = calcPosition(action.payload.align, selectedTemplate.article_placements[index]?.position_x, selectedTemplate.article_placements[index]?.position_y, selectedTemplate.article_placements[index]?.width, selectedTemplate.article_placements[index]?.height, sliderScale)
                    return {
                        ...product,
                        align: action.payload.align,
                        position
                    };
                }
                
                return product;
            });
        },
        setUpdatedPosition:(state,action) =>{
            const article_number= action.payload.article_number;
            state.selectedProducts = state.selectedProducts.map((product) => {
                if (product.article_number === article_number) {
                    return {
                        ...product,
                        updatedPosition: action.payload.updatedPosition
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


export const {appendProducts, findTemplates, removeProducts, setComposedProduct, setProductAligns, setProductTransImg, setSliderScale,setUpdatedPosition} = productsSlice.actions
export const productsReducer = productsSlice.reducer
export default productsSlice.reducer