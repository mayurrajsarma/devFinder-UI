import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice" ;
import feedReducer from "./feedSlice" ;
import conectionReducer from "./connectionSlice" ;
import requestReducer from "./requestSlice" ;

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection: conectionReducer,
        request: requestReducer
    }
});

export default appStore ;