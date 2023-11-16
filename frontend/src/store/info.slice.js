import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
    name: 'info',
    initialState:{
        adminMethod: false,
        language:"en"
    },
    reducers:{
        switchRole:(state, action) => {
            state.adminMethod = action.payload
        },
        setSelectedLanguage:(state, action) => {
            state.language = action.payload
        }
    }
})


export const {switchRole,setSelectedLanguage} = infoSlice.actions
export const infoReducer = infoSlice.reducer
export default infoSlice.reducer