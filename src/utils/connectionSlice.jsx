import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "Connection",
    initialState: null,
    reducers: {
        addConnection : (state,action)=> {
            return action.payload ;
        },
        removeConnection: (state,action)=> {
            const arr = state.filter(c=> c.connectionId != action.payload);
            return arr ;
        }
    }
})

export const {addConnection, removeConnection} = connectionSlice.actions ;
export default connectionSlice.reducer ;