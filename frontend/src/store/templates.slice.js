import { createSlice } from "@reduxjs/toolkit";

export const templateSlice = createSlice(
{
    name:'templates',
    initialState:{
        templateData:[],
        loadingStatus:true,
        page:1,
        filterData:{}
    },
    reducers:{
        initTemplate:(state,action) => {
            state.templateData = action.payload
        },
        appendTemplate:(state,action) => {
            state.templateData = [...state.templateData,...action.payload]
        },
        setLoadingStatus:(state,action) => {
            state.loadingStatus = action.payload
        },
        selectPage:(state,action) =>{
            state.page = action.payload
        },
        setFilterData:(state,action) => {
            state.filterData = action.payload
        }
    }
}
)

export const {initTemplate, appendTemplate, setLoadingStatus, selectPage, setFilterData} = templateSlice.actions
export const templateReducer = templateSlice.reducer
export default templateSlice.reducer