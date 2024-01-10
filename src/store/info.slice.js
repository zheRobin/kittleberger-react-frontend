import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
    name: 'info',
    initialState:{
        adminMethod: false,
        language:"en",
        updatedDate:"30.10.2023"
    },
    reducers:{
        setSelectedLanguage:(state, action) => {
            state.language = action.payload
        },
        setUpdatedDate:(state,action) => {
            state.updatedDate = action.payload
        },
        setTemplateTypes: (state, action) => {
            state.templateTypes = action.payload;
        },
    }
})


export const infoActions = {...infoSlice.actions}
export const infoReducer = infoSlice.reducer
export default infoSlice.reducer