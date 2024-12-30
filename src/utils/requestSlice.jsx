import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequest: (state,action)=> {
            // console.log() ;
            return action.payload ;
        },
        removeRequest: (state,action)=> {
            // console.log(state);
            // console.log(action.payload)
            const arr = state.filter(r=> r._id != action.payload);
            return arr ;
        }
    }
});

export const {addRequest,removeRequest} = requestSlice.actions ;
export default requestSlice.reducer ;