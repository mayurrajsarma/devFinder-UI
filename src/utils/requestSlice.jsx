import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequest: (state,action)=> {
            return action.payload ;
        },
        removeRequest: (state,action)=> {
            const arr = state.filter(r=> r._id != action.payload);
            return arr ;
        }
    }
});

export const {addRequest,removeRequest} = requestSlice.actions ;
export default requestSlice.reducer ;