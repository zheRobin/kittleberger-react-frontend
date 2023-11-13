import { createSlice } from "@reduxjs/toolkit";

export const templateSlice = createSlice(
{
    name:'templates',
    initialState:{
        templateData:[],
        productsOnTemplates:[],
        loadingStatus:true,
        page:1,
        filterData:{},
        resetStatus:false
    },
    reducers:{
        initTemplate:(state,action) => {
            state.templateData = action.payload
        },
        initProductsOnTemplates: (state, action) => {
            state.productsOnTemplates = action.payload
        },
        appendTemplate:(state,action) => {
            state.templateData = [...state.templateData,...action.payload]
        },
        appendProductsOnTemplate:(state,action) => {
            state.productsOnTemplates = [...state.productsOnTemplates,...action.payload]
        },
        setLoadingStatus:(state,action) => {
            state.loadingStatus = action.payload
        },
        selectPage:(state,action) =>{
            state.page = action.payload
        },
        setFilterData:(state,action) => {
            state.filterData = action.payload
        },
        setResetStatus:(state,action) => {
            state.resetStatus = action.payload
        }
    }
}
)

export const {initTemplate, initProductsOnTemplates, appendTemplate, setLoadingStatus, selectPage, setFilterData, setResetStatus, appendProductsOnTemplate} = templateSlice.actions
export const templateReducer = templateSlice.reducer
export default templateSlice.reducer