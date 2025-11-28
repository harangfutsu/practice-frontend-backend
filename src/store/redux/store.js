import { configureStore } from "@reduxjs/toolkit"
import courseReducer from "./courseReducer"
import userReducer from "./userReducer"

export default configureStore({
    reducer : {
        course : courseReducer,
        user : userReducer

    }
})
