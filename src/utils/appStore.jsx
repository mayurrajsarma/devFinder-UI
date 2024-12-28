import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice" ;
import feedReducer from "./feedSlice" ;
import conectionReducer from "./connectionSlice" ;

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection: conectionReducer,
    }
});

export default appStore ;