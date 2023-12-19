import { createSlice  } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: 'products',
    initialState:{
        selectedProducts: JSON.parse(localStorage.getItem('productsInfo')),
        selectedTemplate: JSON.parse(localStorage.getItem('templateInfo')),
        selectedCountry:[],
        composedProduct:localStorage.getItem('composeInfo'),
        usedArticles:[],
        cardInfo:JSON.parse(localStorage.getItem('cardInfo')),
        saveStatus: false
    },
    reducers:{
        setSaveStatus: (state, action) => {
            state.saveStatus = action.payload
        },
        setCardInfo:(state, action) =>{
            state.cardInfo = action.payload
        },
        setUsedArticles:(state,action) => {
            state.usedArticles = [...state.usedArticles,...action.payload]
        },
        emptyStore:(state, action) => {
            state.selectedProducts = []
            state.selectedTemplate = []
            state.selectedCountry = []
            state.cardInfo ={}
            state.usedArticles =[]
            localStorage.setItem('cardInfo', JSON.stringify({}));
            localStorage.setItem('productsInfo', JSON.stringify([]));
            localStorage.setItem('templateInfo', JSON.stringify({}));
          },
        appendProducts: (state, action) => {
            const productsLength = state.selectedProducts.length
            const originIndexes = Array.from({length: 10}, (_, i) => i + 1)
            const prevPosIndexes = state.selectedProducts.map((product) => product.pos_index);
            const oddIndexes = originIndexes.filter((index) => !prevPosIndexes.includes(index));
            state.selectedProducts = productsLength === 0 ? 
            [{...action.payload,pos_index:state.selectedTemplate.article_placements[0].pos_index}] : 
            [...state.selectedProducts, {...action.payload,pos_index:state.selectedTemplate.article_placements[oddIndexes[0]-1].pos_index}];
            localStorage.setItem('productsInfo', JSON.stringify(state.selectedProducts));
        },
        removeProducts:(state,action) =>{
            state.selectedProducts = state.selectedProducts.filter((product) => product.mediaobject_id !== action.payload.mediaobject_id)
            localStorage.setItem('productsInfo', JSON.stringify(state.selectedProducts));
        },
        updateProducts:(state,action) =>{
            state.selectedProducts = action.payload
            localStorage.setItem('productsInfo', JSON.stringify(state.selectedProducts));
        },
        findTemplates:(state, action) => {
            state.selectedTemplate = action.payload
        },
        setComposedProduct:(state, action) => {
            state.composedProduct = action.payload
            localStorage.setItem('composeInfo', (state.composedProduct));
        },
        setProductAligns:(state,action) =>{
            const mediaobject_id= action.payload.mediaobject_id;
            state.selectedProducts = state.selectedProducts.map((product,index) => {
                if (product.mediaobject_id === mediaobject_id) {
                    return {
                        ...product,
                        align: action.payload.align
                    };
                }
                
                return product;
            });
            localStorage.setItem('productsInfo', JSON.stringify(state.selectedProducts));
        },
        setUpdatedPosition:(state,action) =>{
            const mediaobject_id= action.payload.mediaobject_id;
            state.selectedProducts = state.selectedProducts.map((product) => {
                if (product.mediaobject_id === mediaobject_id) {
                    return {
                        ...product,
                        updatedPosition: action.payload.updatedPosition
                    };
                }
                return product;
            });
            localStorage.setItem('productsInfo', JSON.stringify(state.selectedProducts));
        },
        setProductTransImg:(state,action) =>{
            const mediaobject_id= action.payload.mediaobject_id;
            state.selectedProducts = state.selectedProducts.map((product) => {
                if (product.mediaobject_id === mediaobject_id) {
                    return {
                        ...product,
                        is_transparent: action.payload.is_transparent
                    };
                }
                return product;
            });
            localStorage.setItem('productsInfo', JSON.stringify(state.selectedProducts));
        },
        setSliderScale:(state,action) =>{
            const mediaobject_id= action.payload.mediaobject_id;
            state.selectedProducts = state.selectedProducts.map((product,index) => {

                if (product.mediaobject_id === mediaobject_id) {
                    return {
                        ...product,
                        sliderScale: action.payload.sliderScale,
                    };
                }
                return product;
            });
            localStorage.setItem('productsInfo', JSON.stringify(state.selectedProducts));
        },
        setProductLists:(state,action) => {
            state.selectedProducts = action.payload
            localStorage.setItem('productsInfo', JSON.stringify(state.selectedProducts));
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


export const {setSaveStatus, setUsedArticles,setCardInfo, emptyStore,setProductLists, appendCountries, removeCountries, appendProducts, updateProducts, findTemplates, removeProducts, setComposedProduct, setProductAligns, setProductTransImg, setSliderScale,setUpdatedPosition} = productsSlice.actions
export const productsReducer = productsSlice.reducer
export default productsSlice.reducer