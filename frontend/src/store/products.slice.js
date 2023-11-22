import { createSlice, current  } from "@reduxjs/toolkit";
import { calcPosition } from "../_services/Product";

export const productsSlice = createSlice({
    name: 'products',
    initialState:{
        selectedProducts: [],
        selectedTemplate: JSON.parse(localStorage.getItem('templateInfo')),
        selectedCountry:[],
        composedProduct:'',
        usedArticles:[],
        cardInfo:{}
    },
    reducers:{
        setCardInfo:(state, action) =>{
            state.cardInfo = action.payload
        },
        setUsedArticles:(state,action) => {
            state.usedArticles = action.payload
        },
        emptyStore:(state, action) => {
            state.selectedProducts = []
            state.selectedTemplate = []
            state.selectedCountry = []
            state.cardInfo ={}
            state.usedArticles =[]
          },
        appendProducts: (state, action) => {
            const productsLength = state.selectedProducts.length
            state.selectedProducts = productsLength === 0 ? 
            [{...action.payload,pos_index:state.selectedTemplate.article_placements[0].pos_index}] : 
            [...state.selectedProducts, {...action.payload,pos_index:state.selectedTemplate.article_placements[productsLength].pos_index}];
          },
        removeProducts:(state,action) =>{
            state.selectedProducts = state.selectedProducts.filter((product) => product.article_number !== action.payload.article_number)
        },
        updateProducts:(state,action) =>{
            state.selectedProducts = action.payload
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
                        is_transparent: action.payload.is_transparent
                    };
                }
                return product;
            });
        },
        setSliderScale:(state,action) =>{
            const article_number= action.payload.article_number;
            const selectedTemplate = current(state.selectedTemplate)
            state.selectedProducts = state.selectedProducts.map((product,index) => {
                let position = calcPosition(action.payload?.align, selectedTemplate.article_placements[index]?.position_x, selectedTemplate.article_placements[index]?.position_y, selectedTemplate.article_placements[index]?.width, selectedTemplate.article_placements[index]?.height, action.payload.sliderScale)

                if (product.article_number === article_number) {
                    return {
                        ...product,
                        sliderScale: action.payload.sliderScale,
                        position
                    };
                }
                return product;
            });
        },
        setProductLists:(state,action) => {
            state.selectedProducts = action.payload
        },
        appendCountries: (state, action) => {
            const countriesLength = state.selectedCountry.length
            state.selectedCountry = countriesLength === 0 ? [action.payload] : [...state.selectedCountry, action.payload];
          },
        removeCountries:(state,action) =>{
            state.selectedCountry = state.selectedCountry.filter((country) => country !== action.payload)
        },
    }
})


export const {setUsedArticles,setCardInfo, emptyStore,setProductLists, appendCountries, removeCountries, appendProducts, updateProducts, findTemplates, removeProducts, setComposedProduct, setProductAligns, setProductTransImg, setSliderScale,setUpdatedPosition} = productsSlice.actions
export const productsReducer = productsSlice.reducer
export default productsSlice.reducer