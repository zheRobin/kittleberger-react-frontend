import { createSlice } from "@reduxjs/toolkit";

export const templateSlice = createSlice(
{
    name:'templates',
    initialState:{
        templateData:[],
        productsOnTemplates:[],
        loadingTemplateStatus:true,
        loadingProductStatus:true,
        page:1,
        filterData:{},
        resetStatus:false,
        selectedValues:[]
    },
    reducers:{
        initTemplate:(state,action) => {
            state.templateData = action.payload
        },
        setSelectedValues:(state,action) =>{
            state.selectedValues = action.payload
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
        setTemplateLoadingStatus:(state,action) => {
            state.loadingTemplateStatus = action.payload
        },
        setProductLoadingStatus:(state,action) => {
            state.loadingProductStatus = action.payload
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

export const {initTemplate,setSelectedValues, initProductsOnTemplates, appendTemplate, setTemplateLoadingStatus,setProductLoadingStatus, selectPage, setFilterData, setResetStatus, appendProductsOnTemplate} = templateSlice.actions
export const templateReducer = templateSlice.reducer
export default templateSlice.reducer