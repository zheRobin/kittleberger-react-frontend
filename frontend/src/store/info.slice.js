import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
    name: 'info',
    initialState:{
        adminMethod: false
    },
    reducers:{
        switchRole:(state, action) => {
            state.adminMethod = action.payload
        }
    }
})


export const {switchRole} = infoSlice.actions
export const infoReducer = infoSlice.reducer
export default infoSlice.reducer