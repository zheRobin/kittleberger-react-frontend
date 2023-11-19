import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
    name: 'info',
    initialState:{
        adminMethod: false,
        language:"en",
        updatedDate:"30.10.2023"
    },
    reducers:{
        switchRole:(state, action) => {
            state.adminMethod = action.payload
        },
        setSelectedLanguage:(state, action) => {
            state.language = action.payload
        },
        setUpdatedDate:(state,action) => {
            state.updatedDate = action.payload
        }
    }
})


export const {switchRole,setSelectedLanguage,setUpdatedDate} = infoSlice.actions
export const infoReducer = infoSlice.reducer
export default infoSlice.reducer