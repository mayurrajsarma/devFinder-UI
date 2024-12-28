import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "Connection",
    initialState: null,
    reducers: {
        addConnection : (state,action)=> {
            return action.payload ;
        },
        removeConnection: (state,action)=> {
            return null ;
        }
    }
})

export const {addConnection} = connectionSlice.actions ;
export default connectionSlice.reducer ;