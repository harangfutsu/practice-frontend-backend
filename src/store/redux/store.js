import { configureStore } from "@reduxjs/toolkit"
import courseReducer from "./courseReducer"

export default configureStore({
    reducer : {
        course : courseReducer
    }
})
